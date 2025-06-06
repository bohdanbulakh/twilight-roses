import { OrderResponse } from '@twilight-roses/utils/responses';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';

export const Create: ApiDocumentationParams = {
  isAuth: true,
  unauthorized: 'default',
  created: {
    type: OrderResponse,
  },
};
