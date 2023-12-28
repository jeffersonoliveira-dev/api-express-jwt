import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Schema } from "joi"
import ApiError from './api_error.helper';

export const JoiSchemaValidator = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true, 
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
        req.body = value;
        return next();
    }
}