import { prisma } from '../../lib/prisma.js';
import { MealData, SortPrice } from '../../types';

const createMeal = async (provider_id: string, data: MealData) => {
  if (!provider_id || !data.category_id || !data.meal_name || !data.price) {
    throw new Error('Missing required fields to create a meal');
  }
  const meal = await prisma.foodMeal.create({
    data: {
      ...data,
      provider_id,
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

const getMeals = async (sortprice: SortPrice, category_name: string) => {
  return await prisma.foodMeal.findMany({
    where: {
      is_available: true,
      ...(category_name && {
        category: {
          category_name: category_name,
        },
      }),
    },
    include: {
      provider: {
        select: {
          id: true,
          name: true,
          providerProfile: {
            select: {
              id: true,
              restaurant_name: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          category_name: true,
        },
      },
    },
    orderBy: [
      {
        price: sortprice === 'desc' ? 'desc' : 'asc',
      },
      { createdAt: 'desc' },
    ],
  });
};

const getMealsByCategory = async (category_id: string) => {
  return await prisma.foodMeal.findMany({
    where: {
      category_id,
    },
    include: {
      category: {
        select: { id: true, category_name: true },
      },
      provider: {
        select: {
          id: true,
          name: true,
          providerProfile: {
            select: {
              restaurant_name: true,
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
        select: { id: true, category_name: true },
      },
      provider: {
        select: {
          id: true,
          name: true,
          providerProfile: {
            select: {
              restaurant_name: true,
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
