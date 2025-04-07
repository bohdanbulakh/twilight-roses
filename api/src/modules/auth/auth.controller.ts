import { Body, Controller, Post, Res } from '@nestjs/common';
import { CookieUtils } from '../../common/utils/request.utils';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterDTO } from '@twilight-roses/utils';
import { Response } from 'express';
import { LocalGuard } from '../../common/guards/auth/local.guard';
import { ApiEndpoint } from 'src/common/decorators/api-endpoint.decorator';
import { AuthDocumentation } from '../../common/documentation/modules/auth';
import { RefreshGuard } from '../../common/guards/auth/refresh.guard';
import { RefreshTokenEntity } from '../../database/entities/refresh-token.entity';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('/register')
  @ApiEndpoint({
    summary: 'Register a user',
    documentation: AuthDocumentation.REGISTER,
  })
  async register (
    @Body() data: RegisterDTO,
  ) {
    return this.authService.register(data);
  }

  @Post('/login')
  @ApiEndpoint({
    summary: 'Login',
    guards: LocalGuard,
    documentation: AuthDocumentation.LOGIN,
  })
  @Post('/login')
  async login (
    @GetUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(user);
    CookieUtils.setResponseJwt(response, accessToken, refreshToken, {
      accessExpires: this.authService.getTokenExpTime(accessToken),
      refreshExpires: this.authService.getTokenExpTime(refreshToken),
    });
  }

  @Post('/refresh')
  @ApiEndpoint({
    summary: 'Refresh',
    guards: RefreshGuard,
    documentation: AuthDocumentation.REFRESH,
  })
  async refresh (
    @GetUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(user);
    CookieUtils.setResponseJwt(response, accessToken, refreshToken, {
      accessExpires: this.authService.getTokenExpTime(accessToken),
      refreshExpires: this.authService.getTokenExpTime(refreshToken),
    });
  }

  @Post('/logout')
  @ApiEndpoint({
    summary: 'Logout',
    guards: RefreshGuard,
    documentation: AuthDocumentation.LOGOUT,
  })
  async logout (
    @GetUser('token') token: RefreshTokenEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(token);
    CookieUtils.clearResponseCookie(response);
  }
}
