import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderByIdPipe } from '../../common/pipes/order-by-id.pipe';
import { GetUser } from '../../common/decorators/get-user.decorator';

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
  create (@GetUser('id') userId: string) {
    return this.orderService.create({ userId });
  }

  @Delete('/:id')
  deleteById (@Param('id', OrderByIdPipe) id: string) {
    return this.orderService.deleteById(id);
  }
}
