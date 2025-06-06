import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { OrderResponse } from './order.response';

export class OrdersResponse {
  @ApiProperty({
    type: [OrdersResponse],
    description: 'List of all orders',
  })
  @AutoMap(() => OrderResponse)
    orders: OrderResponse[];
}
