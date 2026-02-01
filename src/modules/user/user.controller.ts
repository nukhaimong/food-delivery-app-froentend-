import { Request, Response } from 'express';
import { userService } from './user.services';
import { UserStatus } from '../../types';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'users retrieved successfully',
      users,
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

const getUserById = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    const userId = req.params.userId as string;
    const user = await userService.getUserById(userId);
    res.status(200).json({
      success: true,
      message: 'user retrieved successfully',
      user,
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

const updatedUser = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    const userId = req.user?.id as string;
    const user = await userService.updateUser(userId, req.body);
    res.status(200).json({
      success: true,
      message: 'user updated successfully',
      user,
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

const suspendOrActivateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const { status } = req.body;
    const user = await userService.suspendOrActivateUser(userId, status);
    if (status === UserStatus.active) {
      return res.status(200).json({
        success: true,
        message: 'user activated successfully',
        user,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'user suspended successfully',
      user,
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const user = await userService.deleteUser(userId);
    return res.status(200).json({
      success: true,
      message: 'user deleted successfully',
      user,
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

export const userController = {
  getAllUsers,
  getUserById,
  updatedUser,
  suspendOrActivateUser,
  deleteUser,
};
