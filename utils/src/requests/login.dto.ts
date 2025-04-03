import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  ENG_REGEX,
  NUM_REGEX,
  message,
} from '../validation.util';

export class LoginDTO {
  @ApiProperty({
    description: 'User\'s username in the application',
  })
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    message.custom('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(message.notEmpty('Username'))
  @IsString(message.ofType('Username', 'a string'))
  username: string;

  @ApiProperty({
    description: 'User\'s password to access account',
  })
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    message.custom('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(message.notEmpty('Password cannot be empty'))
  @IsString(message.ofType('Password', 'a string'))
  password: string;
}
