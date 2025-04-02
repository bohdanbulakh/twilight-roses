import { ProductEntity } from './product.entity';
import { CategoryEntity } from './category.entity';

export class ProductCategoryEntity {
  id: string;
  product?: ProductEntity;
  productId: string;
  category?: CategoryEntity;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
