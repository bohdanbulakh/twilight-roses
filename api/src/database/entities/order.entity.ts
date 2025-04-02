import { ProductOrderEntity } from './product-order.entity';
import { UserEntity } from './user.entity';

export class OrderEntity {
  id: number;
  user?: UserEntity;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  productOrders?: ProductOrderEntity[];
}
