import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { OrderResponse } from '@twilight-roses/utils';

export const GetById: ApiDocumentationParams = {
  ok: {
    type: OrderResponse,
  },
  badRequest: {
    description: `
    InvalidEntityIdException:
      Order with such id not found`
  },
  params: [{
    name: 'id',
    description: 'Id of the order',
  }]
}
