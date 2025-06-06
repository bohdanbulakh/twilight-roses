import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderByIdPipe } from '../../common/pipes/order-by-id.pipe';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { ApiEndpoint } from 'src/common/decorators/api-endpoint.decorator';
import { OrderDocumentation } from '../../common/documentation/modules/order';
import { AccessGuard } from '../../common/guards/auth/access.guard';
import { OrderEntity, OrdersEntity } from '../../database/entities/order.entity';
import { OrderResponse, OrdersResponse } from '@twilight-roses/utils';

@Controller('/orders')
export class OrderController {
  constructor (private readonly orderService: OrderService) {}

  @Get()
  @ApiEndpoint({
    summary: 'Get all orders',
    documentation: OrderDocumentation.GET_ALL,
    mapResponse: {
      from: OrdersEntity,
      to: OrdersResponse,
    },
  })
  getAll () {
    return this.orderService.getAll();
  }

  @Get('/:id')
  @ApiEndpoint({
    summary: 'Get order by id',
    documentation: OrderDocumentation.GET_BY_ID,
    mapResponse: {
      from: OrderEntity,
      to: OrderResponse,
    },
  })
  getById (@Param('id', OrderByIdPipe) id: string) {
    return this.orderService.getById(id);
  }

  @Post()
  @ApiEndpoint({
    summary: 'Create new order',
    documentation: OrderDocumentation.CREATE,
    guards: AccessGuard,
    mapResponse: {
      from: OrderEntity,
      to: OrderResponse,
    },
  })
  create (@GetUser('id') userId: string) {
    return this.orderService.create({ userId });
  }

  @Delete('/:id')
  @ApiEndpoint({
    summary: 'Delete order by id',
    documentation: OrderDocumentation.DELETE_BY_ID,
    guards: AccessGuard,
    mapResponse: {
      from: OrderEntity,
      to: OrderResponse,
    },
  })
  deleteById (@Param('id', OrderByIdPipe) id: string) {
    return this.orderService.deleteById(id);
  }
}
