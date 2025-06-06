import { Controller } from '@nestjs/common';
import { ProductRepository } from '../../database/repositories/product.repository';

@Controller('products')
export class ProductController {
  constructor (private readonly productService: ProductRepository) {}
}
