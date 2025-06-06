import { Create } from './create';
import { DeleteById } from './deleteById';
import { GetAll } from './getAll';
import { GetById } from './getById';

export const OrderDocumentation = {
  GET_ALL: GetAll,
  GET_BY_ID: GetById,
  CREATE: Create,
  DELETE_BY_ID: DeleteById,
}
