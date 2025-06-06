import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from './product.response';

export class OrderResponse {
  @ApiProperty({
    description: 'Order id',
  })
    id: string;

  @ApiProperty({
    description: 'Id of the order owner',
  })
    userId: string;

  @ApiProperty({
    description: 'Order Products',
    type: [ProductResponse],
  })
    products: ProductResponse[];
}
