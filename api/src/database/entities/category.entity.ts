import { ProductCategoryEntity } from './product-category.entity';

export class CategoryEntity {
  id: string;
  name: string;
  description: string | null;
  parent?: CategoryEntity;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  children?: CategoryEntity[];
  productCategories?: ProductCategoryEntity[];
}
