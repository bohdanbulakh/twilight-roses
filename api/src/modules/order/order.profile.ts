import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { OrderEntity } from '../../database/entities/order.entity';
import { OrderResponse } from '@twilight-roses/utils';

export class OrderProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, OrderEntity, OrderResponse,
        forMember(({ products }) => products,
          mapFrom(({ productOrders }) => productOrders.map(({ product }) => product))));
    };
  }
}
