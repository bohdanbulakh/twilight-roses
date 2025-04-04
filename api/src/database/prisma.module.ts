import { Global, Module } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { EmailTokenRepository } from './repositories/email-token.repository';
import { UserRepository } from './repositories/user.repository';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    OrderRepository,
    CategoryRepository,
    EmailTokenRepository,
  ],
  exports: [
    UserRepository,
    OrderRepository,
    CategoryRepository,
    EmailTokenRepository,
  ],
})
export class PrismaModule {}
