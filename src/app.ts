import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/Modules/students/student.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
