import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { ProductEntity, ProductsEntity } from '../../database/entities/product.entity';
import { ProductResponse, ProductsResponse } from '@twilight-roses/utils/responses';

export class ProductProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, ProductEntity, ProductResponse);
      createMap(mapper, ProductsEntity, ProductsResponse);
    };
  }
}
