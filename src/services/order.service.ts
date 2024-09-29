import { Order } from '../interfaces/order.interface';
import { OrderModel } from '../models/order.model';

export class OrderService {
  public static async getAllOrders(): Promise<Order[]> {
    // Logique pour récupérer tous les utilisateurs
    return [new OrderModel(1)];
  }
}