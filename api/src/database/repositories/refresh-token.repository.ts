import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RefreshTokenRepository extends PrismaRepository<'refreshToken', RefreshTokenEntity> {
  constructor (prisma: PrismaService) {
    super(prisma.refreshToken);
  }
}
