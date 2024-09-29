import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
  public async getAllOrders(req: Request, res: Response): Promise<void> {
    const order = await OrderService.getAllOrders();
    res.json(order);
  }
}