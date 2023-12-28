import joi, { Schema } from 'joi';
import validator from 'cpf-cnpj-validator';

const Joi = joi.extend(validator);
export const UserCreateSchema: Schema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.document().cpf(),
  dateOfBirth: Joi.date().required(),
  address: Joi.object({
    street: Joi.string().required(),
    number: Joi.string().required(),
    addressComplement: Joi.string(),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    cep: Joi.string().required(),
  }).required(),
});
