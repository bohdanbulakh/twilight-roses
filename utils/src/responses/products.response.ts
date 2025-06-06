import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { ProductResponse } from './product.response';

export class ProductsResponse {
  @ApiProperty({
    description: 'List of products',
    type: [ProductResponse],
  })
  @AutoMap(() => [ProductResponse])
    products: ProductResponse[];
}
