import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from '@twilight-roses/utils/requests';
import { ProductService } from './product.service';
import { ProductByIdPipe } from '../../common/pipes/product-by-id.pipe';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { ProductDocumentation } from '../../common/documentation/modules/product';
import { AccessGuard } from '../../common/guards/auth/access.guard';

@Controller('products')
export class ProductController {
  constructor (private readonly productService: ProductService) {}

  @Get()
  @ApiEndpoint({
    summary: 'Get all products',
    documentation: ProductDocumentation.GET_ALL,
  })
  getAll () {
    return this.productService.getAll();
  }

  @Get(':id')
  @ApiEndpoint({
    summary: 'Get product by id',
    documentation: ProductDocumentation.GET_BY_ID,
  })
  getById (@Param('id', ProductByIdPipe) id: string) {
    return this.productService.getById(id);
  }

  @Post()
  @ApiEndpoint({
    summary: 'Create new product',
    documentation: ProductDocumentation.CREATE,
    guards: AccessGuard,
  })
  create (@Body() data: CreateProductDTO) {
    return this.productService.create(data);
  }

  @Post(':id')
  @ApiEndpoint({
    summary: 'Update product by id',
    documentation: ProductDocumentation.UPDATE_BY_ID,
    guards: AccessGuard,
  })
  updateById (
    @Param('id', ProductByIdPipe) id: string,
    @Body() data: UpdateProductDTO,
  ) {
    return this.productService.updateById(id, data);
  }

  @Delete(':id')
  @ApiEndpoint({
    summary: 'Delete order by id',
    documentation: ProductDocumentation.DELETE_BY_ID,
    guards: AccessGuard,
  })
  deleteById (@Param('id', ProductByIdPipe) id: string) {
    return this.productService.deleteById(id);
  }
}
