import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor.', message: error.message });
};

export default errorHandler;