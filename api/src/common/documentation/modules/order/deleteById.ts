import { OrderResponse } from '@twilight-roses/utils/responses';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';

export const DeleteById: ApiDocumentationParams = {
  isAuth: true,
  unauthorized: 'default',
  badRequest: {
    description: `
    InvalidEntityIdException  
      Order with such id is not found`,
  },
  ok: {
    type: OrderResponse,
  },
  params: [{
    name: 'id',
    description: 'Id of the order',
  }],
};
