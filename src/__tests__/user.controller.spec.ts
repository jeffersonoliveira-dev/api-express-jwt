import UserService from '../services/user.service';
import AddressService from '../services/address.service';
import { AddressInstance, UserInstance } from '../models';

jest.mock('../models');

const mockAddressData = {
  id: 'addressId',
  street: '123 Main St',
  number: '456',
  addressComplement: 'Apt 789',
  neighborhood: 'Downtown',
  city: 'Cityville',
  state: 'ST',
  cep: '12345-678',
} as AddressInstance;

const mockUserData = {
  id: '1',
  cpf: '12345678900',
  name: 'John Doe',
  dateOfBirth: new Date('1990-01-01'),
  status: 'active',
  createdById: 'creatorId',
  removedAt: null,
  createdAt: new Date('2023-01-01'),
  address: mockAddressData,
} as UserInstance;

describe('UserService', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(UserService, 'create').mockResolvedValue(mockUserData);

      const newUser = await UserService.create(mockUserData);

      expect(newUser).toEqual(mockUserData);
    });
  });

  describe('getById', () => {
    it('should get a user by ID', async () => {
      const userId = '1';

      jest.spyOn(UserService, 'getById').mockResolvedValue({} as UserInstance);

      const user = await UserService.getById(userId);

      expect(user).toBeDefined();
    });

    it('should return null for non-existent user ID', async () => {
      const nonExistentUserId = 'nonexistent';

      jest.spyOn(UserService, 'getById').mockResolvedValue(null);

      const user = await UserService.getById(nonExistentUserId);

      expect(user).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updatedUserData = {
        // Provide updated user data
      } as Partial<UserInstance>;

      jest.spyOn(UserService, 'update').mockResolvedValue(true);

      const updated = await UserService.update(userId, updatedUserData);

      expect(updated).toBeTruthy();
    });

    it('should return false for non-existent user ID during update', async () => {
      const nonExistentUserId = 'nonexistent';
      const updatedUserData = {
        // Provide updated user data
      } as Partial<UserInstance>;

      jest.spyOn(UserService, 'update').mockResolvedValue(false);

      const updated = await UserService.update(nonExistentUserId, updatedUserData);

      expect(updated).toBeFalsy();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '1';

      jest.spyOn(UserService, 'remove').mockResolvedValue(true);

      const removed = await UserService.remove(userId);

      expect(removed).toBeTruthy();
    });

    it('should return false for non-existent user ID during removal', async () => {
      const nonExistentUserId = 'nonexistent';

      jest.spyOn(UserService, 'remove').mockResolvedValue(false);

      const removed = await UserService.remove(nonExistentUserId);

      expect(removed).toBeFalsy();
    });
  });
});

describe('AddressService', () => {
  describe('create', () => {
    it('should create a new address', async () => {
      jest.spyOn(AddressService, 'create').mockResolvedValue(mockAddressData);

      const newAddress = await AddressService.create(mockAddressData);

      expect(newAddress).toEqual(mockAddressData);
    });

    it('should throw an error when creating an address fails', async () => {
      jest.spyOn(AddressService, 'create').mockRejectedValue(new Error('Erro ao criar endereço'));

      await expect(AddressService.create(mockAddressData)).rejects.toThrow('Erro ao criar endereço');
    });
  });
});
