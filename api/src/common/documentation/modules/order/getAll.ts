import { OrderResponse } from '@twilight-roses/utils/responses';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';

export const GetAll: ApiDocumentationParams = {
  ok: {
    type: [OrderResponse],
  },
};
