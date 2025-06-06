import { ProductResponse } from '@twilight-roses/utils/responses';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';

export const UpdateById: ApiDocumentationParams = {
  isAuth: true,
  unauthorized: 'default',
  created: {
    type: ProductResponse,
  },
  badRequest: {
    description: `
    InvalidBodyException:
      Name must be a string
      Description must be a string`,
  },
};
