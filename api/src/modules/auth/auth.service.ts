import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SecurityConfigService } from '../../config/security-config.service';
import { AlreadyRegisteredException } from '../../common/exceptions/already-registered.exception';
import { RegisterDTO } from '@twilight-roses/utils';
import { UserEntity } from '../../database/entities/user.entity';
import { JwtPayload } from './types/jwt.payload';
import { RefreshTokenRepository } from '../../database/repositories/refresh-token.repository';
import { UserWithToken } from './types/user-with-token.type';
import { RefreshTokenEntity } from '../../database/entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: SecurityConfigService,
  ) {}

  async register (data: RegisterDTO) {
    if (await this.checkIfUserIsRegistered(data)) {
      throw new AlreadyRegisteredException();
    }

    data.password = await this.hashPassword(data.password);
    await this.userRepository.create(data);
  }


  async login (user: UserEntity) {
    return {
      accessToken: this.generateToken(user, 'access'),
      refreshToken: await this.createRefreshToken(user),
    };
  }

  async refresh (user: UserWithToken) {
    const expiresIn = Math.floor((this.getTokenExpTime(user.token.token) - Date.now()) / 1000);

    await this.refreshTokenRepository.deleteById(user.id);
    return {
      accessToken: this.generateToken(user, 'access'),
      refreshToken: await this.createRefreshToken(user, { expiresIn }),
    };
  }

  async logout ({ id }: RefreshTokenEntity) {
    await this.refreshTokenRepository.deleteById(id);
  }

  getTokenExpTime (token: string) {
    return this.jwtService.decode(token).exp * 1000;
  }

  private async checkIfUserIsRegistered (query: { email?: string, username?: string }) {
    const user = await this.userRepository.findOne({
      OR: [
        { email: query.email },
        { username: query.username },
      ],
    });
    return !!user?.password;
  }

  private async hashPassword (password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  private async createRefreshToken (user: UserEntity, options?: JwtSignOptions) {
    await this.clearExpiredTokens(user.id);
    const token = this.generateToken(user, 'refresh', options);

    await this.userRepository.updateById(user.id, {
      refreshTokens: {
        create: { token },
      },
    });

    await this.clearUserSessions(user);
    return token;
  }

  private async clearExpiredTokens (userId?: string) {
    const tokens = await this.refreshTokenRepository.findMany({ userId });
    const now = Date.now();

    for (const { id, token } of tokens) {
      if (this.getTokenExpTime(token) <= now) {
        await this.refreshTokenRepository.deleteById(id);
      }
    }
  }

  private async clearUserSessions ({ id }: UserEntity) {
    const tokens = await this.refreshTokenRepository.findMany(
      { userId: id }, undefined, { createdAt: 'asc' });

    for (let i = 0; tokens.length - i > this.configService.sessions; i++) {
      await this.refreshTokenRepository.deleteById(tokens[i].id);
    }
  }

  private generateToken (user: UserEntity, token: 'access' | 'refresh', options?: JwtSignOptions) {
    const payload = this.createPayload(user);

    return this.jwtService.sign(payload, {
      expiresIn: this.configService[`${token}Ttl`],
      secret: this.configService[`${token}Secret`],
      ...options,
    });
  }

  private createPayload ({ id: sub }: UserEntity): JwtPayload {
    return { sub };
  }
}
