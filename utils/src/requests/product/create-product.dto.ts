import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { message } from '../../validation.util';

export class CreateProductDTO {
  @ApiProperty({
    description: 'Name of the product',
  })
  @IsString(message.ofType('Name', 'a string'))
  @IsNotEmpty(message.notEmpty('Name'))
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the product',
  })
  @IsString(message.ofType('Description', 'a string'))
  @IsOptional()
    description?: string;
}
