import express from 'express';
import passport from 'passport';
import helmet from 'helmet';
import cors from "cors"
import sequelize from './db';
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/error.middleware';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
  })
);

app.use(bodyParser.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRoutes);
app.use(errorHandler);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


export default app