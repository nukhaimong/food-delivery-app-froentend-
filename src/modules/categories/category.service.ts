import { prisma } from '../../lib/prisma';

const createCategory = async ({
  category_name,
  description,
  category_image,
}: {
  category_name: string;
  description: string;
  category_image: string;
}) => {
  if (!category_name || !description || !category_image) {
    throw new Error('All Fields are required');
  }
  const category = await prisma.foodCategory.create({
    data: {
      category_name,
      description,
      category_image,
    },
  });
  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.foodCategory.findMany();
  return categories;
};

const getCategoryById = async (id: string) => {
  const category = await prisma.foodCategory.findUnique({
    where: {
      id,
    },
    include: {
      foodMeals: true,
    },
  });
  return category;
};
const updateCategory = async (
  categoryId: string,
  data: {
    category_name?: string;
    description?: string;
  },
) => {
  if (Object.keys(data).length === 0) {
    throw new Error('No data to update.');
  }
  const category = await prisma.foodCategory.update({
    where: {
      id: categoryId,
    },
    data,
  });
  return category;
};
const deleteCategory = async (id: string) => {
  const category = await prisma.foodCategory.delete({
    where: {
      id,
    },
  });
  return category;
};
export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
