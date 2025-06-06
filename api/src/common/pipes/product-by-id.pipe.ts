import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { ProductRepository } from '../../database/repositories/product.repository';

@Injectable()
export class ProductByIdPipe implements PipeTransform {
  constructor (private readonly productRepository: ProductRepository) {}

  async transform (id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) throw new InvalidEntityIdException('Product');

    return id;
  }
}
