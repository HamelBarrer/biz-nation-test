import cors from 'cors';
import express from 'express';

import authRouter from './auth/routers/v1/auth.router';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);

export default app;
