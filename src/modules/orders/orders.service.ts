import { prisma } from '../../lib/prisma';
import { OrderData, OrderStatus } from '../../types';

const createOrder = async (customer_id: string, data: OrderData) => {
  if (
    !data.delivery_address?.trim() ||
    !data.phone_number?.trim() ||
    data.orderItems.length < 1
  ) {
    throw new Error('You must provide all required information');
  }
  const total_price = data.orderItems.reduce((sum, items) => {
    return sum + items.price * items.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      delivery_address: data.delivery_address,
      phone_number: data.phone_number,
      customer_id: customer_id,
      total_price: total_price,
      orderItems: {
        create: data.orderItems.map((items) => ({
          meal_id: items.meal_id,
          price: items.price,
          quantity: items.quantity,
        })),
      },
    },
    include: {
      customer: {
        select: { name: true, image: true },
      },
      orderItems: {
        include: {
          meal: {
            select: {
              provider: { select: { name: true, image: true } },
              category: { select: { category_name: true } },
              meal_name: true,
              image_url: true,
              description: true,
              price: true,
            },
          },
        },
      },
    },
  });
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
      orderItems: {
        include: {
          meal: {
            select: {
              provider: { select: { name: true, image: true } },
              category: { select: { category_name: true } },
              meal_name: true,
              image_url: true,
              description: true,
              price: true,
            },
          },
        },
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
      orderItems: {
        include: {
          meal: {
            select: {
              provider: { select: { name: true, image: true } },
              category: { select: { category_name: true } },
              meal_name: true,
              image_url: true,
              description: true,
              price: true,
            },
          },
        },
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
