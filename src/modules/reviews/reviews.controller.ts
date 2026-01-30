import { Request, Response } from 'express';
import { reviewService } from './reviews.service';
import { UserRole } from '../../types';

const createReviews = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id as string;
    const mealId = req.params.mealId as string;

    const review = await reviewService.createReviews(
      customerId,
      mealId,
      req.body,
    );

    return res.status(201).json({
      sucess: true,
      message: 'review created successfully',
      review,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const getReviewsByMeal = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.mealId as string;

    const reviews = await reviewService.getReviewsByMeal(mealId);

    if (reviews.length === 0) {
      return res.status(404).json({
        sucess: false,
        message: 'No reviews found for this meal',
        reviews,
      });
    }

    return res.status(200).json({
      sucess: true,
      message: 'reviews retrieved successfully',
      reviews,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id as string;
    const reviewId = req.params.reviewId as string;

    const review = await reviewService.updateReview(
      reviewId,
      customerId,
      req.body,
    );

    return res.status(200).json({
      sucess: true,
      message: 'review updated successfully',
      review,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const deleteReviews = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id as string;
    const user_role = req.user?.user_role as UserRole;
    const reviewId = req.params.reviewId as string;

    const review = await reviewService.deleteReviews(
      reviewId,
      customerId,
      user_role,
    );

    return res.status(200).json({
      sucess: true,
      message: 'review deleted successfully',
      review,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

export const reviewsController = {
  createReviews,
  getReviewsByMeal,
  updateReview,
  deleteReviews,
};
