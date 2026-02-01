import { Request, Response } from 'express';
import { providerProfileService } from './providerProfile.service';
import { UserStatus } from '../../types';

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    const provider_id = req.user?.id as string;
    const { restaurant_name, address, phone_number } = req.body;

    const profile = await providerProfileService.createProviderProfile({
      provider_id,
      restaurant_name,
      address,
      phone_number,
    });
    return res.status(201).json({
      success: true,
      message: 'Provider profile created successfully',
      profile,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const getAllProvider = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    const allProviders = await providerProfileService.getAllProvider();
    return res.status(200).json({
      success: true,
      message: 'All provider profiles retrieved successfully',
      allProviders,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const getProviderById = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    const provider_id = req.params.providerId as string;
    const provider = await providerProfileService.getProviderById(provider_id);
    return res.status(200).json({
      success: true,
      message: 'Provider profile retrieved successfully',
      provider,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const getProviderOwnProfile = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    const provider_id = req.user?.id as string;
    const provider =
      await providerProfileService.getProviderOwnProfile(provider_id);

    return res.status(200).json({
      success: true,
      message: 'Your profile retrieved successfully',
      provider,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const updateProviderProfile = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }

    const provider_id = req.user?.id as string;

    const provider = await providerProfileService.updateProviderProfile(
      provider_id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: 'Your profile updated successfully',
      provider,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const deleteProviderProfile = async (req: Request, res: Response) => {
  try {
    if (req.user?.status === UserStatus.suspended) {
      return res.status(400).json({
        success: false,
        message: "You're suspended",
      });
    }
    const provider_id = req.params.providerId as string;

    const provider =
      await providerProfileService.deleteProviderProfile(provider_id);

    return res.status(200).json({
      success: true,
      message: 'Your profile deleted successfully',
      provider,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const providerProfileController = {
  createProviderProfile,
  getAllProvider,
  getProviderById,
  getProviderOwnProfile,
  updateProviderProfile,
  deleteProviderProfile,
};
