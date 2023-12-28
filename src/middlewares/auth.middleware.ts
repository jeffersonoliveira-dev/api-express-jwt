import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User, { UserInstance } from '../models/user.model';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secreto',
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { cpf: payload.user.cpf } });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.use(jwtStrategy);

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: UserInstance, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized', message: info?.message });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
