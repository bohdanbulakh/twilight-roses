import { ProductCategoryEntity } from './product-category.entity';
import { ProductOrderEntity } from './product-order.entity';

export class ProductEntity {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  productOrders?: ProductOrderEntity[];
  productCategories?: ProductCategoryEntity[];
}
