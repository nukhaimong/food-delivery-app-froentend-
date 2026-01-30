import { Request, Response } from 'express';
import { orderService } from './orders.service';

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

export const orderController = {
  createOrder,
};
