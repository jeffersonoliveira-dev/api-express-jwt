import { Request, Response, NextFunction } from 'express';
import  { UserInstance, User, Address } from '../models';
import httpStatus from 'http-status';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Address,
          as: 'address',
        },
      ],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Address,
          as: 'address',
        },
      ],
    });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByPk(userId, { include: Address });

    if (!updatedUser) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Usuário não encontrado' });
    }

    await updatedUser.update(req.body);

    if(updatedUser.address) {
      await updatedUser.address.update(req.body.address)
    }

    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user?.update({ ...user, status: 'removed', removedAt: new Date(), removedById: (req.user as UserInstance)?.id });

    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Crie o novo usuário
    const newUser = await User.create({
      ...req.body,
      createdById: (req.user as UserInstance)?.id,
      createdAt: new Date()
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
