import express from 'express';
import auth from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { reviewsController } from './reviews.controller';

const router = express.Router();

router.get('/meal/:mealId', reviewsController.getReviewsByMeal);

router.put(
  '/update/:reviewId',
  auth(UserRole.user, UserRole.provider, UserRole.admin),
  reviewsController.updateReview,
);

router.post(
  '/:mealId',
  auth(UserRole.user, UserRole.provider, UserRole.provider),
  reviewsController.createReviews,
);

router.delete(
  '/delete/:reviewId',
  auth(UserRole.user, UserRole.provider, UserRole.admin),
  reviewsController.deleteReviews,
);

export const reviewsRoutes = router;
