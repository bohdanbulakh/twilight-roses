import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { ProductResponse } from '@twilight-roses/utils';

export const GetById: ApiDocumentationParams = {
  ok: {
    type: ProductResponse,
  },
  badRequest: {
    description: `
    InvalidEntityIdException:
      Product with such id not found`,
  },
  params: [{
    name: 'id',
    description: 'Id of the product',
  }],
};
