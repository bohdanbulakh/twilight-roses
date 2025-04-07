import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserWithToken } from '../../modules/auth/types/user-with-token.type';

export const GetUser = createParamDecorator(
  (field: keyof Omit<UserWithToken, 'password'> | null = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return field ? request.user?.[field] : request.user;
  });
