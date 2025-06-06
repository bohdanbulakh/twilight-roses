import { ApiEndpointParams } from '../documentation/types/api-endpoint-params.type';
import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { addDocumentationDecorators } from '../documentation/get-documentation-decorators';
import { MapInterceptor } from '@automapper/nestjs';

export function ApiEndpoint ({
  summary,
  guards,
  documentation,
  mapResponse,
}: ApiEndpointParams) {
  let description = '';

  if (guards) {
    const guardNames = typeof guards === 'function' ? guards.name : guards.map((g) => g.name).join(', ');
    description += `<b>Guards: ${guardNames}</b>`;
    guards = typeof guards === 'function' ? [guards] : guards;
  }

  const decorators = addDocumentationDecorators(summary, description, documentation);

  if (guards) {
    decorators.push(UseGuards(...guards));
  }

  if (mapResponse) {
    decorators.push(UseInterceptors(MapInterceptor(mapResponse.from, mapResponse.to)));
  }

  return applyDecorators(...decorators);
}
