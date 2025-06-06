import { Dictionary, ModelIdentifier } from '@automapper/core';
import { ApiDocumentationParams } from './api-documentation-params.type';

export class ApiEndpointParams {
  summary: string;
  documentation : ApiDocumentationParams;
  guards?: any | any[];
  mapResponse?: {
    from: ModelIdentifier<Dictionary<unknown>>;
    to: ModelIdentifier<Dictionary<unknown>>;
  };
}
