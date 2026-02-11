import { OrderStatus } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import { OrderData } from '../../types';

const createOrder = async (customer_id: string, data: OrderData[]) => {
  if (data.length < 1) {
    throw new Error('Minimum One Item is required');
  }

  const formattedData = data.map((item) => ({
    ...item,
    total_price: item.price * item.quantity,
    customer_id: customer_id,
  }));

  console.log(formattedData);

  const order = await prisma.order.createMany({
    data: formattedData,
    skipDuplicates: true,
  });

  console.log(order);

  return order;
};

const getOrders = async () => {
  return await prisma.order.findMany();
};

const getOrderById = async (order_id: string) => {
  return await prisma.order.findUnique({
    where: { order_id },
    include: {
      customer: {
        select: { name: true, image: true },
      },
    },
  });
};

const getOrderByCustomerId = async (customer_id: string) => {
  return await prisma.order.findMany({
    where: { customer_id },
    include: {
      customer: {
        select: { name: true, image: true },
      },
    },
  });
};

const updateOrderStatus = async (
  order_id: string,
  order_status: OrderStatus,
) => {
  if (!order_id) {
    throw new Error('The Order in not found');
  }

  const updateOrder = await prisma.order.update({
    where: { order_id },
    data: {
      order_status,
    },
  });
  return updateOrder;
};

const deleteOrder = async (order_id: string) => {
  return await prisma.order.delete({
    where: { order_id },
  });
};

export const orderService = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByCustomerId,
  updateOrderStatus,
  deleteOrder,
};
