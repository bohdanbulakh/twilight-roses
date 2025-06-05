import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from '@twilight-roses/utils';
import { OrderByIdPipe } from '../../common/pipes/order-by-id.pipe';

@Controller('/orders')
export class OrderController {
  constructor (private readonly orderService: OrderService) {}

  @Get()
  getAll () {
    return this.orderService.getAll();
  }

  @Get('/:id')
  getById (@Param('id', OrderByIdPipe) id: string) {
    return this.orderService.getById(id);
  }

  @Post()
  create (@Body() body: CreateOrderDTO) {
    return this.orderService.create(body);
  }

  @Delete('/:id')
  deleteById (@Param('id', OrderByIdPipe) id: string) {
    return this.orderService.deleteById(id);
  }
}
