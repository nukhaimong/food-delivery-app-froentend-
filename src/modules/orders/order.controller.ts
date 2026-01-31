import { Request, Response } from 'express';
import { orderService } from './orders.service';
import { UserRole } from '../../types';

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id as string;

    const order = await orderService.createOrder(customerId, req.body);
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json({
      success: true,
      message: 'All Orders retrieved successfully',
      orders,
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

const getOrdersById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId as string;
    const order = await orderService.getOrderById(orderId);
    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      order,
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

const getOrderByCustomerId = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId as string;
    const order = await orderService.getOrderByCustomerId(customerId);
    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      order,
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

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId as string;
    const order_status = req.body.order_status;
    if (
      req.user?.user_role === UserRole.user &&
      ['PENDING', 'PREPARING', 'DELIVERED'].includes(order_status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Only provider can update order status to  PENDING, PREPARING, DELIVERED',
      });
    }
    if (
      !['PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'].includes(order_status)
    ) {
      return res.status(404).json({
        success: false,
        message: 'Wrong order status, please choose the right one',
      });
    }

    const order = await orderService.updateOrderStatus(orderId, order_status);
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
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

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId as string;
    const order = await orderService.deleteOrder(orderId);
    res.status(200).json({
      success: true,
      message: 'Order Deleted successfully',
      order,
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

export const orderController = {
  createOrder,
  getOrders,
  getOrdersById,
  getOrderByCustomerId,
  updateOrderStatus,
  deleteOrder,
};
