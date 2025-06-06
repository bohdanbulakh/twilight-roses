import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../database/repositories/product.repository';
import { CreateProductDTO, UpdateProductDTO } from '@twilight-roses/utils';

@Injectable()
export class ProductService {
  constructor (private readonly productRepository: ProductRepository) {}

  async getAll () {
    const products = await this.productRepository.findMany({});
    return { products };
  }

  getById (id: string) {
    return this.productRepository.findById(id);
  }

  create (data: CreateProductDTO) {
    return this.productRepository.create(data);
  }

  updateById (id: string, data: UpdateProductDTO) {
    return this.productRepository.updateById(id, data);
  }

  deleteById (id: string) {
    return this.productRepository.deleteById(id);
  }
}
