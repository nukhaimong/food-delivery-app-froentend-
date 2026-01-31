import { prisma } from '../../lib/prisma';

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
        select: { order_method: true, order_status: true, orderItems: true },
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
};

const suspendOrActiveUser = async (useId: string, isActive: boolean) => {
  return await prisma.user.update({
    where: {
      id: useId,
    },
    data: {
      isActive,
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
  suspendOrActiveUser,
  deleteUser,
};
