import { PrismaService } from '../prisma.service';
import { PrismaRepository } from '../prisma.repository';
import { Injectable } from '@nestjs/common';
import { EmailTokenEntity } from '../entities/email-token.entity';
import { TUpdate } from '../types/repository.types';

@Injectable()
export class EmailTokenRepository extends PrismaRepository<'emailToken', EmailTokenEntity> {
  constructor(private prisma: PrismaService) {
    super(prisma.emailToken);
  }

  updateById (id: string, data: TUpdate<'emailToken'>): Promise<EmailTokenEntity> {
    return this.prisma.emailToken.update({
      where: { token: id },
      data,
    })
  }

  deleteById (id: string): Promise<EmailTokenEntity> {
    return this.prisma.emailToken.delete({
      where: { token: id },
    })
  }
}
