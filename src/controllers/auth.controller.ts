import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User , UserInstance } from '../models';
import userService from '../services/user.service';
import httpStatus from 'http-status';
import addressService from '../services/address.service';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';

export const register = async (req: Request, res: Response) => {
  try {
    const newAddress = await addressService.create({ ...req.body.address });
    const newUser = await userService.create({ ...req.body, addressId: newAddress.id });

    res.status(httpStatus.CREATED).json(newUser);
  } catch (error: any) {
    if(error?.name === "SequelizeUniqueConstraintError") {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  message: 'Usuário já registrado' });
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  message: 'Erro ao criar usuário' });
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, async (err: Error, user: UserInstance) => {
    const loginUser = await User.findOne({ where: { cpf: req.body.cpf } });
    if (err || !loginUser) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Credenciais inválidas' });
    }
    const accessToken = jwt.sign({ user: { id: loginUser?.id, cpf: loginUser?.cpf } }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ accessToken });
  })(req, res, next);
};
