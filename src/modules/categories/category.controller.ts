import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  console.log(req.user)
  const {category_name, description} = req.body;
  try {
    const category = await categoryService.createCategory({category_name, description})

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category
    })
  } catch (error) {
    res.status(500).json({
      message: "Server side error", error
    })
  }
}

export const categoryController = {
  createCategory
}