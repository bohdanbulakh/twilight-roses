import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CookieUtils } from '../../common/utils/request.utils';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterDTO } from '@twilight-roses/utils';
import { Response } from 'express';
import { JwtGuard } from 'src/common/guards/auth/jwt.guard';
import { LocalGuard } from '../../common/guards/auth/local.guard';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('/register')
  async register (
    @Body() data: RegisterDTO,
  ) {
    return this.authService.register(data);
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  async login (
    @GetUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.login(user);
    CookieUtils.setResponseJwt(response, accessToken, {
      accessTokenExpires: this.authService.getTokenExpTime(accessToken),
    });
  }

  @Post('/logout')
  @UseGuards(JwtGuard)
  async logout (
    @Res({ passthrough: true }) response: Response,
  ) {
    CookieUtils.clearResponseCookie(response);
  }
}
