import { Request, Response } from 'express';
import { categoryService } from './category.service';

const createCategory = async (req: Request, res: Response) => {
  const { category_name, description, category_image } = req.body;
  try {
    const category = await categoryService.createCategory({
      category_name,
      description,
      category_image,
    });

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category,
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
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getAllCategories();

    return res.status(201).json({
      success: true,
      message: 'Categories retrieved successfully',
      category,
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

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategoryById(
      categoryId as string,
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      category,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server side error',
      });
    }
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId as string;
    const category = await categoryService.updateCategory(categoryId, req.body);

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server side error',
      });
    }
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.deleteCategory(categoryId as string);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category is not found or not deleted',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      category,
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

export const categoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
  deleteCategory,
};
