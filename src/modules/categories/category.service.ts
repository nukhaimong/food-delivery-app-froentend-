import { prisma } from "../../lib/prisma"

const createCategory = async({category_name, description}: {category_name: string, description: string} ) => {
  const category = await prisma.foodCategory.create({
    data: {
      category_name,
      description
    }
  })
  return category
}

export const categoryService = {
  createCategory
}