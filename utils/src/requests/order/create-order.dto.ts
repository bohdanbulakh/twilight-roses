import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { message } from '../../validation.util';

export class CreateOrderDTO {
  @ApiProperty({
    description: 'Owner\'s username in the application',
  })
  @IsString(message.ofType('UserId', 'a string'))
  @IsNotEmpty(message.notEmpty('UserId'))
    userId: string;
}
