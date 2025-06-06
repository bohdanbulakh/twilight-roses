import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from '@twilight-roses/utils/requests';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor (private readonly productService: ProductService) {}

  @Get()
  getAll () {
    return this.productService.getAll();
  }

  @Get(':id')
  getById (@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Post()
  create (@Body() data: CreateProductDTO) {
    return this.productService.create(data);
  }

  @Post(':id')
  updateById (
    @Param('id') id: string,
    @Body() data: UpdateProductDTO,
  ) {
    return this.productService.updateById(id, data);
  }

  @Delete(':id')
  deleteById (@Param('id') id: string) {
    return this.productService.deleteById(id);
  }
}
