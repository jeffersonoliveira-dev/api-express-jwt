import {  DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './user.model';

interface IAddress {
  id: string
  street: string;
  number: string;
  addressComplement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

export interface AddressInstance extends Model<IAddress>, IAddress {}

const Address = sequelize.define<AddressInstance>('Address', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressComplement: {
    type: DataTypes.STRING,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default Address;