import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../database/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor (private readonly productRepository: ProductRepository) {}
}
