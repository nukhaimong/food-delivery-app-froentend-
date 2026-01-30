import { prisma } from '../../lib/prisma';
import { MealData } from '../../types';

const createMeal = async (
  provider_id: string,
  category_id: string,
  data: MealData,
) => {
  if (!provider_id || !category_id || !data.meal_name || !data.price) {
    throw new Error('Missing required fields to create a meal');
  }
  const meal = await prisma.foodMeal.create({
    data: {
      ...data,
      provider_id,
      category_id,
    },
    include: {
      category: { select: { category_name: true } },
      provider: {
        select: { name: true, image: true },
      },
    },
  });
  return meal;
};

const getMeals = async () => {
  return await prisma.foodMeal.findMany();
};

const getMealsByCategory = async (category_id: string) => {
  return await prisma.foodMeal.findMany({
    where: {
      category_id,
    },
    include: {
      category: {
        select: { category_name: true },
      },
      provider: {
        select: {
          name: true,
          status: true,
          image: true,
          providerProfile: {
            select: {
              restaurant_name: true,
              address: true,
              phone_number: true,
            },
          },
        },
      },
    },
  });
};

const getMealsByProvider = async (provider_id: string) => {
  return await prisma.foodMeal.findMany({
    where: {
      provider_id,
    },
    include: {
      category: {
        select: { category_name: true },
      },
      provider: {
        select: {
          name: true,
          status: true,
          image: true,
          providerProfile: {
            select: {
              restaurant_name: true,
              address: true,
              phone_number: true,
            },
          },
        },
      },
    },
  });
};

const getMealById = async (meal_id: string) => {
  return await prisma.foodMeal.findUnique({
    where: {
      id: meal_id,
    },
    include: {
      category: {
        select: { category_name: true },
      },
      provider: {
        select: {
          name: true,
          status: true,
          image: true,
          providerProfile: {
            select: {
              restaurant_name: true,
              address: true,
              phone_number: true,
            },
          },
        },
      },
    },
  });
};

const updateMeal = async (
  meal_id: string,
  provider_id: string,
  data: {
    meal_name?: string;
    price?: number;
    description?: string;
    image?: string;
    category_id: string;
    is_available?: false;
  },
) => {
  if (
    !data.category_id &&
    !data.description &&
    !data.image &&
    !data.meal_name &&
    !data.price &&
    !data.is_available
  ) {
    throw new Error('At least one field is required to update a meal');
  }

  const meal = await prisma.foodMeal.findUnique({
    where: {
      id: meal_id,
    },
  });

  if (!meal || meal.provider_id !== provider_id) {
    throw new Error(
      "Meal not found or you're not authorized to update this meal",
    );
  }

  return await prisma.foodMeal.update({
    where: {
      id: meal_id,
    },
    data: {
      ...data,
    },
    include: {
      category: {
        select: { category_name: true },
      },
    },
  });
};

const deleteMeal = async (meal_id: string, provider_id: string) => {
  const meal = await prisma.foodMeal.findUnique({
    where: {
      id: meal_id,
    },
  });

  if (!meal || meal.provider_id !== provider_id) {
    throw new Error(
      "Meal not found or you're not authorized to update this meal",
    );
  }
  return await prisma.foodMeal.delete({
    where: {
      id: meal_id,
    },
  });
};

export const mealsService = {
  createMeal,
  getMeals,
  getMealsByCategory,
  getMealsByProvider,
  getMealById,
  updateMeal,
  deleteMeal,
};
