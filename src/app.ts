import cors from 'cors';
import express from 'express';

import authRouter from './auth/routers/v1/auth.router';
import coursesRouter from './courses/routers/course.router';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', coursesRouter);

export default app;
