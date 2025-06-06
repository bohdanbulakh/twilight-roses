import { AutoMap } from '@automapper/classes';
import { ProductCategoryEntity } from './product-category.entity';
import { ProductOrderEntity } from './product-order.entity';

export class ProductsEntity {
  @AutoMap(() => [ProductEntity])
    products: ProductEntity[];
}

export class ProductEntity {
  @AutoMap()
    id: string;

  @AutoMap()
    name: string;

  @AutoMap()
    description: string | null;

  createdAt: Date;
  updatedAt: Date;
  productOrders?: ProductOrderEntity[];
  productCategories?: ProductCategoryEntity[];
}
