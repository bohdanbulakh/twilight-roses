import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../database/repositories/order.repository';
import { CreateOrderDTO } from '@twilight-roses/utils';

@Injectable()
export class OrderService {
  constructor (private readonly orderRepository: OrderRepository) {}

  getAll () {
    return this.orderRepository.findMany({})
  }

  getById (id: string) {
    return this.orderRepository.findById(id);
  }

  create (body: CreateOrderDTO) {
    return this.orderRepository.create(body);
  }

  deleteById (id: string) {
    return this.orderRepository.deleteById(id)
  }
}
