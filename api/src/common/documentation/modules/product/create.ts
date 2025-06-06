import { ProductResponse } from '@twilight-roses/utils/responses';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';

export const Create: ApiDocumentationParams = {
  isAuth: true,
  unauthorized: 'default',
  created: {
    type: ProductResponse,
  },
  badRequest: {
    description: `
    InvalidBodyException:
      Name must be a string
      Name cannot be empty
      Description must be a string`,
  },
};
