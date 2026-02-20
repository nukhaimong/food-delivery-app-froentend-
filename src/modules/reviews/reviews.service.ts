import { prisma } from '../../lib/prisma.js';
import { UserRole } from '../../types';

const createReviews = async (
  customer_id: string,
  meal_id: string,
  data: { content: string; rating?: number },
) => {
  if (!meal_id || !data.content || !customer_id) {
    throw new Error('All required field must be provided');
  }
  const review = prisma.reviews.create({
    data: {
      ...data,
      customer_id,
      meal_id,
    },
  });
  return review;
};

const getReviewsByMeal = async (meal_id: string) => {
  return await prisma.reviews.findMany({ where: { meal_id } });
};

const updateReview = async (
  review_id: string,
  customer_id: string,
  data: { content: string; rating?: number },
) => {
  const meal = await prisma.reviews.findUnique({
    where: { id: review_id },
  });
  if (meal?.customer_id !== customer_id) {
    throw new Error('You can only update your own review');
  }

  return await prisma.reviews.update({
    where: { id: review_id },
    data: {
      ...data,
    },
  });
};

const deleteReviews = async (
  review_id: string,
  customer_id: string,
  user_role: UserRole,
) => {
  const meal = await prisma.reviews.findUnique({
    where: { id: review_id },
  });

  if (!meal) {
    throw new Error('Review not found');
  }

  if (meal?.customer_id !== customer_id && user_role !== UserRole.admin) {
    throw new Error('You can only delete your own review');
  }
  return await prisma.reviews.delete({
    where: { id: review_id },
  });
};

export const reviewService = {
  createReviews,
  getReviewsByMeal,
  updateReview,
  deleteReviews,
};
