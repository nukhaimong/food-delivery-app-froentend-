import { prisma } from '../../lib/prisma.js';
import { UserStatus } from '../../types';

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      orders: {
        select: {
          order_method: true,
          order_status: true,
        },
      },
    },
  });
};

const updateUser = async (
  userId: string,
  data: { name: string; image: string },
) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });
  return updatedUser;
};

const suspendOrActivateUser = async (useId: string, status: UserStatus) => {
  return await prisma.user.update({
    where: {
      id: useId,
    },
    data: {
      status,
    },
  });
};

const deleteUser = async (userId: string) => {
  return await prisma.user.delete({ where: { id: userId } });
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUser,
  suspendOrActivateUser,
  deleteUser,
};
