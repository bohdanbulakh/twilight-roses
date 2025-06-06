import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class ProductResponse {
  @ApiProperty({
    description: 'Product id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Product name',
  })
  @AutoMap()
    name: string;

  @ApiProperty({
    description: 'Product description',
  })
  @AutoMap()
    description: string;
}
