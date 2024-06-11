import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/Modules/students/student.route';
import { userRoutes } from './app/Modules/users/user.route';
import { json } from 'stream/consumers';
import globalErrorHandler from './app/middleware/globalsErrorHandler';
import notFound from './app/middleware/noFound';
import router from './app/routes';
const app: Application = express();
app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
