import joi from "joi";
import validator from 'cpf-cnpj-validator';

const Joi = joi.extend(validator);

export const UserLoginSchema = Joi.object({
    cpf: Joi.document().cpf()
});