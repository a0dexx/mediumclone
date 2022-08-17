import { OrderInterface } from './order.interface';

export interface OrderStateInterface {
  isLoading: boolean;
  error: string | null;
  orders: OrderInterface[] | null;
  selectedOrder: OrderInterface|null;

}
