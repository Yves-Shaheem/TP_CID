import { Order} from '../interfaces/order.interface';

export class OrderModel implements Order{
  constructor(public id: number) {}
}