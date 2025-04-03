import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ENG_REGEX, NUM_REGEX, UKR_REGEX, UKRSPEC_REGEX, message } from '../validation.util';

export class RegisterDTO {
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    message.custom('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(message.notEmpty('Username'))
  @IsString(message.ofType('Username', 'a string'))
    username: string;

  @IsNotEmpty(message.notEmpty('Email'))
  @IsEmail({}, message.ofType('Email', 'an email'))
    email: string;

  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    message.custom('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsNotEmpty(message.notEmpty('Password'))
  @IsString(message.ofType('Password', 'a string'))
    password: string;

  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    message.custom('First name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(message.notEmpty('First name'))
  @IsString(message.ofType('First name', 'a string'))
    firstName: string;

  @Matches(
    new RegExp('^[' + UKR_REGEX + UKRSPEC_REGEX + ']{2,40}$'),
    message.custom('Last name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(message.notEmpty('Last name'))
  @IsString(message.ofType('Last name', 'string'))
    lastName: string;
}
