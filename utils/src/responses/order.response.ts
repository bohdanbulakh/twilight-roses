import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from './product.response';
import { AutoMap } from '@automapper/classes';

export class OrderResponse {
  @ApiProperty({
    description: 'Order id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Id of the order owner',
  })
  @AutoMap()
    userId: string;

  @ApiProperty({
    description: 'Order Products',
    type: [ProductResponse],
  })
  @AutoMap(() => [ProductResponse])
    products: ProductResponse[];
}
