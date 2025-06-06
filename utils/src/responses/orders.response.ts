import { ApiProperty } from '@nestjs/swagger';

export class OrdersResponse {
  @ApiProperty({
    type: [OrdersResponse],
    description: 'List of all orders',
  })
    orders: OrdersResponse[];
}
