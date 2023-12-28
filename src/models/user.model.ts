import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Address, { AddressInstance } from './address.model';

interface IUser {
  id?: string;
  cpf: string;
  name: string;
  dateOfBirth: Date;
  status: "active" | "removed";
  createdById?: string;
  removedById?: string;
  removedAt?: Date | null;
  createdAt: Date;
}

export interface UserInstance extends Model<IUser>, IUser {
  address?: AddressInstance;
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
  },
  removedById: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
  },
  removedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default User;
