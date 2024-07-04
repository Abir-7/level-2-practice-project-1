import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middleware/globalsErrorHandler';
import notFound from './app/middleware/noFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(cookieParser());
//application route
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
