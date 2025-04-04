import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ENG_REGEX, NUM_REGEX, UKR_REGEX, UKRSPEC_REGEX, message } from '../validation.util';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from '../enums';

export class RegisterDTO {
  @ApiProperty({ description: 'User\'s username in the application' })
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    message.custom('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(message.notEmpty('Username'))
  @IsString(message.ofType('Username', 'a string'))
    username: string;

  @ApiPropertyOptional({ description: 'User\'s email in the application'})
  @IsEmail({}, message.ofType('Email', 'an email'))
  @IsOptional()
    email?: string;

  @ApiProperty({ description: 'User\'s password to access account' })
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    message.custom('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(message.notEmpty('Password'))
  @IsString(message.ofType('Password', 'a string'))
    password: string;

  @ApiProperty({ description: 'User\'s first name in the application' })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    message.custom('First name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(message.notEmpty('First name'))
  @IsString(message.ofType('First name', 'a string'))
    firstName: string;

  @ApiPropertyOptional({ description: 'User\'s last name in the application' })
  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    message.custom('Last name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsString(message.ofType('Last name', 'string'))
  @IsOptional()
    lastName?: string;

  @ApiPropertyOptional({
    enum: UserType,
    description: 'User\'s account type in the application'
  })
  @IsEnum(UserType, message.ofType('Type', 'an enum'))
  @IsOptional()
    type?: UserType;
}
