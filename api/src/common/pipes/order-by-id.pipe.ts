import { Injectable, PipeTransform } from '@nestjs/common';
import { OrderRepository } from '../../database/repositories/order.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class OrderByIdPipe implements PipeTransform {
  constructor (private readonly orderRepository: OrderRepository) {}

  async transform (id: string) {
    const order = await this.orderRepository.findById(id);

    if (!order) throw new InvalidEntityIdException('Order');

    return id;
  }
}
