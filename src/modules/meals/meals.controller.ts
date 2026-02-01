import { Request, Response } from 'express';
import { mealsService } from './meals.service';
import { UserStatus } from '../../types';

const createMeal = async (req: Request, res: Response) => {
  try {
    const provider_id = req.user?.id as string;
    const category_id = req.params.categoryId as string;

    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    if (!provider_id) {
      return res.status(400).json({
        success: false,
        message: 'Provider ID is required',
      });
    }
    if (!category_id) {
      return res.status(400).json({
        success: false,
        message: 'Category ID is required',
      });
    }

    const meal = await mealsService.createMeal(
      provider_id,
      category_id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: 'Meal created successfully',
      meal,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const getMeals = async (req: Request, res: Response) => {
  try {
    const meals = await mealsService.getMeals();
    if (meals.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No meal found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Meals fetched successfully',
      meals,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const getMealById = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.mealId as string;

    const meal = await mealsService.getMealById(mealId);
    if (meal === null) {
      return res.status(404).json({
        success: false,
        message: 'No meal found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Meal fetched successfully',
      meal,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const getMealsByCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId as string;
    const meals = await mealsService.getMealsByCategory(categoryId);
    if (meals.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No meal found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Meals fetched successfully',
      meals,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const getMealsByProvider = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.providerId as string;
    const meals = await mealsService.getMealsByProvider(providerId);

    if (meals.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No meal found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Meals fetched successfully',
      meals,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const providerId = req.user?.id as string;
    const mealId = req.params.mealId as string;

    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    if (!providerId) {
      return res.status(400).json({
        success: false,
        message: "You Can't update this meal",
      });
    }
    if (!mealId) {
      return res.status(400).json({
        success: false,
        message: 'Meal ID is required',
      });
    }
    const meal = await mealsService.updateMeal(mealId, providerId, req.body);
    return res.status(200).json({
      success: true,
      message: 'Meal updated successfully',
      meal,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const providerId = req.user?.id as string;
    const mealId = req.params.mealId as string;

    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    if (!providerId) {
      return res.status(400).json({
        success: false,
        message: "You Can't delete this meal",
      });
    }
    if (!mealId) {
      return res.status(400).json({
        success: false,
        message: 'Meal ID is required',
      });
    }
    await mealsService.deleteMeal(mealId, providerId);
    return res.status(200).json({
      success: true,
      message: 'Meal deleted successfully',
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server Side Error',
      });
    }
  }
};

export const mealsController = {
  createMeal,
  deleteMeal,
  getMeals,
  getMealById,
  getMealsByCategory,
  getMealsByProvider,
  updateMeal,
};
