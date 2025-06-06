import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { message } from '../../validation.util';

export class UpdateProductDTO {
  @ApiPropertyOptional({
    description: 'Name of the product',
  })
  @IsString(message.ofType('Name', 'a string'))
  @IsOptional()
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the product',
  })
  @IsString(message.ofType('Description', 'a string'))
  @IsOptional()
    description?: string;
}
