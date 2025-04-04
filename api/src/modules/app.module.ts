import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { ApiModule } from './api.module';

@Module({
  imports: [
    PrismaModule,
    ApiModule,
  ],
})
export class AppModule {}
