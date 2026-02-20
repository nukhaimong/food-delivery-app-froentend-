import express, { Application, Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import { categoryRoutes } from './modules/categories/category.routes.js';
import cors from 'cors';
import { providerProfileRoutes } from './modules/providerProfile/providerProfile.routes.js';
import { mealsRoutes } from './modules/meals/meals.routes.js';
import { orderRoutes } from './modules/orders/order.routes.js';
import { reviewsRoutes } from './modules/reviews/reviews.routes.js';
import { userRoutes } from './modules/user/user.routes.js';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://food-delivery-app-frontend-umber.vercel.app',
    credentials: true,
  }),
);
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use('/category', categoryRoutes);
app.use('/provider-profile', providerProfileRoutes);
app.use('/meals', mealsRoutes);
app.use('/order', orderRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Food Delivery App Backend is running!');
});

export default app;
