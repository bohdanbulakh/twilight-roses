import { ApiDocumentationParams } from './api-documentation-params.type';
import { NestInterceptor } from '@nestjs/common';

export class ApiEndpointParams {
  summary: string;
  documentation : ApiDocumentationParams;
  guards?: any | any[];
  interceptors?: NestInterceptor | NestInterceptor[];
}
