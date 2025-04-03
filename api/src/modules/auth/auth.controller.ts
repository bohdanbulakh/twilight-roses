import { Body, Controller, Post, Res } from '@nestjs/common';
import { CookieUtils } from '../../common/utils/request.utils';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterDTO } from '@twilight-roses/utils';
import { Response } from 'express';
import { JwtGuard } from 'src/common/guards/auth/jwt.guard';
import { LocalGuard } from '../../common/guards/auth/local.guard';
import { ApiEndpoint } from 'src/common/decorators/api-endpoint.decorator';
import { AuthDocumentation } from '../../common/documentation/modules/auth';

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
  @ApiEndpoint({
    summary: 'Logout',
    guards: JwtGuard,
    documentation: AuthDocumentation.LOGOUT,
  })
  async logout (
    @Res({ passthrough: true }) response: Response,
  ) {
    CookieUtils.clearResponseCookie(response);
  }
}
