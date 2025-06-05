import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderByIdPipe } from '../../common/pipes/order-by-id.pipe';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderByIdPipe],
})
export class OrderModule {}
