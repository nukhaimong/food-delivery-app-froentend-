import { prisma } from '../../lib/prisma.js';
import { UserRole } from '../../types';

interface ProviderProfile {
  provider_id: string;
  restaurant_name: string;
  address: string;
  phone_number: string;
  restaurant_image: string;
}

interface ProviderProfileUpdate {
  restaurant_name?: string;
  address?: string;
  phone_number?: string;
  restaurant_image?: string;
}

const createProviderProfile = async ({
  provider_id,
  restaurant_name,
  address,
  phone_number,
  restaurant_image,
}: ProviderProfile) => {
  if (
    !provider_id ||
    !restaurant_name ||
    !address ||
    !phone_number ||
    !restaurant_image
  ) {
    throw new Error('All fields are required to create a provider profile');
  }
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { provider_id },
  });
  if (existingProfile) {
    await prisma.providerProfile.delete({
      where: { provider_id },
    });
  }
  const profile = await prisma.providerProfile.create({
    data: {
      provider_id,
      restaurant_name,
      address,
      phone_number,
      restaurant_image,
    },
  });
  return profile;
};

const getAllProviderProfile = async () => {
  const profiles = await prisma.providerProfile.findMany({});
  return profiles;
};

const getProviderById = async (provider_id: string) => {
  const provider = await prisma.user.findUnique({
    where: {
      id: provider_id,
    },
    include: {
      providerProfile: true,
      foodMeals: true,
    },
  });
  return provider;
};

const getProviderOwnProfile = async (provider_id: string) => {
  const provider = await prisma.user.findUnique({
    where: { id: provider_id },
    include: {
      providerProfile: true,
      foodMeals: true,
      orders: true,
    },
  });
  return provider;
};

const updateProviderProfile = async (
  provider_id: string,
  data: ProviderProfileUpdate,
) => {
  if (Object.keys(data).length === 0) {
    throw new Error('No data to update');
  }
  const updatedProfile = await prisma.providerProfile.update({
    where: {
      provider_id,
    },
    data,
    include: {
      user: true,
    },
  });
  return updatedProfile;
};

const deleteProviderProfile = async (provider_id: string) => {
  const providerProfile = await prisma.providerProfile.delete({
    where: {
      provider_id,
    },
  });
  return providerProfile;
};

export const providerProfileService = {
  createProviderProfile,
  getAllProviderProfile,
  getProviderById,
  getProviderOwnProfile,
  updateProviderProfile,
  deleteProviderProfile,
};
