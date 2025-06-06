import { ProductOrderEntity } from './product-order.entity';
import { UserEntity } from './user.entity';
import { AutoMap } from '@automapper/classes';

export class OrderEntity {
  @AutoMap()
    id: number;

  user?: UserEntity;

  @AutoMap()
    userId: string | null;

  createdAt: Date;
  updatedAt: Date;
  productOrders?: ProductOrderEntity[];
}
