import { Global, Module } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { EmailTokenRepository } from './repositories/email-token.repository';
import { UserRepository } from './repositories/user.repository';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from './prisma.service';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { ProductRepository } from './repositories/product.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    OrderRepository,
    CategoryRepository,
    EmailTokenRepository,
    RefreshTokenRepository,
    ProductRepository,
  ],
  exports: [
    UserRepository,
    OrderRepository,
    CategoryRepository,
    EmailTokenRepository,
    RefreshTokenRepository,
    ProductRepository,
  ],
})
export class PrismaModule {}
