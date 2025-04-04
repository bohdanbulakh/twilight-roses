import { UserRepository } from 'src/database/repositories/user.repository';
import { JwtPayload } from './types/jwt.payload';
import { UserEntity } from '../../database/entities/user.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AlreadyRegisteredException } from '../../common/exceptions/already-registered.exception';
import * as process from 'process';
import { RegisterDTO } from '@twilight-roses/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register (data: RegisterDTO) {
    if (await this.checkIfUserIsRegistered(data)) {
      throw new AlreadyRegisteredException();
    }

    data.password = await this.hashPassword(data.password);
    return this.userRepository.create(data);
  }


  async login (user: UserEntity) {
    return {
      accessToken: this.generateToken(user),
    };
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


  private generateToken (user: UserEntity, options?: JwtSignOptions) {
    const payload = this.createPayload(user);

    return this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TTL,
      secret: process.env.ACCESS_SECRET,
      ...options,
    });
  }

  private createPayload ({ id: sub, createdAt }: UserEntity): JwtPayload {
    return {
      sub,
      createdAt,
    };
  }
}
