import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderByIdPipe } from '../../common/pipes/order-by-id.pipe';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { ApiEndpoint } from 'src/common/decorators/api-endpoint.decorator';
import { OrderDocumentation } from '../../common/documentation/modules/order';
import { AccessGuard } from '../../common/guards/auth/access.guard';
import { MapInterceptor } from '@automapper/nestjs';
import { OrderEntity } from '../../database/entities/order.entity';
import { OrderResponse } from '@twilight-roses/utils';

@Controller('/orders')
export class OrderController {
  constructor (private readonly orderService: OrderService) {}

  @Get()
  @ApiEndpoint({
    summary: 'Get all orders',
    documentation: OrderDocumentation.GET_ALL,
  })
  getAll () {
    return this.orderService.getAll();
  }

  @Get('/:id')
  @ApiEndpoint({
    summary: 'Get order by id',
    documentation: OrderDocumentation.GET_BY_ID,
    interceptors: MapInterceptor(OrderEntity, OrderResponse),
  })
  getById (@Param('id', OrderByIdPipe) id: string) {
    return this.orderService.getById(id);
  }

  @Post()
  @ApiEndpoint({
    summary: 'Create new order',
    documentation: OrderDocumentation.CREATE,
    guards: AccessGuard,
    interceptors: MapInterceptor(OrderEntity, OrderResponse),
  })
  create (@GetUser('id') userId: string) {
    return this.orderService.create({ userId });
  }

  @Delete('/:id')
  @ApiEndpoint({
    summary: 'Delete order by id',
    documentation: OrderDocumentation.DELETE_BY_ID,
    guards: AccessGuard,
    interceptors: MapInterceptor(OrderEntity, OrderResponse),
  })
  deleteById (@Param('id', OrderByIdPipe) id: string) {
    return this.orderService.deleteById(id);
  }
}
