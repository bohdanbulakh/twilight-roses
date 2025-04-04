import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { ApiModule } from './api.module';
import Configuration from '../config/configuration.constant'
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.twilight-roses-api.${process.env.NODE_ENV}.env`,
      load: [Configuration],
    }),
    PrismaModule,
    ApiModule,
  ],
})
export class AppModule {}
