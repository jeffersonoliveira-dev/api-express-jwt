// auth.controller.test.ts
import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import * as authController from '../controllers/auth.controller';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User, { UserInstance } from '../models/user.model';
import addressService from '../services/address.service';

jest.mock('../services/user.service');
jest.mock('passport');
jest.mock('../models/user.model');
jest.mock('http-status');
jest.mock('jsonwebtoken');

const mocked = jest.mocked;
const mockedPassport = passport as jest.Mocked<typeof passport>;
const mockedUser = User as jest.Mocked<typeof User>;
const mockedHttpStatus = httpStatus as jest.Mocked<typeof httpStatus>;

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('register', () => {
    it('should create a new user and return it', async () => {
      const req: Partial<Request> = {
        body: {
          name: 'John Doe',
          cpf: '12345678901',
          dateOfBirth: '1990-01-01',
          address: {
            street: 'Rua Julia Mota',
            city: 'RJ',
            number: '21',
            neighborhood: 'guaratiba',
            state: 'RJ',
            cep: '23030690',
          },
        },
      };
      const res: Partial<Response> = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockedCreateUser = {
        name: 'John Doe',
        cpf: '12345678901',
        dateOfBirth: '1990-01-01',
        address: {
          street: 'Rua Julia Mota',
          city: 'RJ',
          number: '21',
          neighborhood: 'guaratiba',
          state: 'RJ',
          cep: '23030690',
        },
      } as any;

      const mockedNewAddress = { id: 'new-address-id', ...req.body.address };
      jest.spyOn(addressService, 'create').mockResolvedValueOnce(mockedNewAddress);

      jest.spyOn(userService, 'create').mockResolvedValueOnce(mockedCreateUser);

      await authController.register(req as Request, res as Response);

      expect(addressService.create).toHaveBeenCalledWith(req.body.address);
      expect(userService.create).toHaveBeenCalledWith({
        ...req.body,
        addressId: mockedNewAddress.id,
      });

      expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith(mockedCreateUser);
    });

    it('should handle errors and return a 500 status code', async () => {
      const req: Partial<Request> = { body: {} };
      const res: Partial<Response> = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      mocked(userService.create).mockRejectedValue(new Error('Some error'));

      await authController.register(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar usuário' });
    });
  });

  describe('login', () => {
    it('should return an access token for valid credentials', async () => {
      const req: Partial<Request> = { body: { cpf: 'valid-cpf' } };
      const res: Partial<Response> = { json: jest.fn() };
      const next: NextFunction = jest.fn();

      mockedPassport.authenticate.mockImplementationOnce((strategy, options, callback) => {
        return (req: any, res: any, next: any) => {
          callback?.(null, {} as UserInstance);
        };
      });

      mockedUser.findOne.mockResolvedValueOnce({ id: 'user-id', cpf: 'valid-cpf' } as UserInstance);

      jest.spyOn(jwt, 'sign').mockReturnValueOnce('mocked-access-token' as any);

      await authController.login(req as Request, res as Response, next);

      expect(jwt.sign).toHaveBeenCalledWith(
        { user: { id: 'user-id', cpf: 'valid-cpf' } },
        expect.any(String),
        { expiresIn: '1h' }
      );
      expect(res.json).toHaveBeenCalledWith({ accessToken: 'mocked-access-token' });
    });

    it('should handle authentication failure and return UNAUTHORIZED', async () => {
      const req: Partial<Request> = { body: { cpf: 'invalid-cpf' } };
      const res: Partial<Response> = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next: NextFunction = jest.fn();

      mockedPassport.authenticate.mockImplementationOnce((strategy, options, callback) => {
        return (req: any, res: any, next: any) => {
          callback?.(new Error('Authentication failed'));
        };
      });

      await authController.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(mockedHttpStatus.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith({ message: 'Credenciais inválidas' });
    });
  });
});
