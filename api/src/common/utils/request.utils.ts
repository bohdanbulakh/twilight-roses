import { CookieOptions, Request, Response } from 'express';

export class CookieUtils {
  static getRequestJwt (token: string) {
    return [
      (req: Request) => {
        const cookies = req.cookies;
        return cookies?.[token];
      },
    ];
  }

  static setResponseCookie (
    res: Response,
    tokenName: string,
    token: string,
    options?: CookieOptions,
  ) {
    res.cookie(tokenName, token, {
      httpOnly: true,
      secure: true,
      ...options,
    });
  }

  static setResponseJwt (
    res: Response,
    accessToken: string,
    { accessTokenExpires }: { accessTokenExpires: number; },
  ) {
    CookieUtils.setResponseCookie(res, 'access_token', accessToken, {
      expires: new Date(accessTokenExpires),
    });
  }

  static clearResponseCookie (res: Response) {
    CookieUtils.setResponseCookie(res, 'access_token', '', {
      expires: new Date(0),
    });
  }
}
