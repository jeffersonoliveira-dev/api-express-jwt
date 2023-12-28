import { JoiSchemaValidator } from '../helpers/validator.helper';
import { UserCreateSchema } from './schemas/user.create.schema';
import { UserLoginSchema } from './schemas/user.login.schema';


export const userCreateValidator = JoiSchemaValidator(UserCreateSchema)

export const userLoginValidator =  JoiSchemaValidator(UserLoginSchema)

export const userUpdateValidator = JoiSchemaValidator(UserCreateSchema)
