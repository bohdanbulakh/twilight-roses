import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductByIdPipe } from '../../common/pipes/product-by-id.pipe';
import { ProductProfile } from './product.profile';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductByIdPipe, ProductProfile],
})
export class ProductModule {}
