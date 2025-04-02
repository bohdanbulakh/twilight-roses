import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

export class ProductOrderEntity {
  id: string;
  product?: ProductEntity;
  productId: string;
  order?: OrderEntity;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}
