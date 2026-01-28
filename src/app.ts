

import express, { Application, Request, request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { categoryRouter } from './modules/categories/category.routes';
import cors from 'cors'

const app: Application = express();
app.use(express.json());
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000"
}))
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use('/category', categoryRouter)

export default app;