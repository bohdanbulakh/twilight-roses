import { ProductResponse } from '@twilight-roses/utils/responses';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';

export const DeleteById: ApiDocumentationParams = {
  isAuth: true,
  unauthorized: 'default',
  badRequest: {
    description: `
    InvalidEntityIdException  
      Product with such id is not found`,
  },
  ok: {
    type: ProductResponse,
  },
  params: [{
    name: 'id',
    description: 'Id of the product',
  }],
};
