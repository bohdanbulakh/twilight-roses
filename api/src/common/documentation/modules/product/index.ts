import { Create } from './create';
import { DeleteById } from './deleteById';
import { GetAll } from './getAll';
import { GetById } from './getById';
import { UpdateById } from './updateById';

export const ProductDocumentation = {
  GET_ALL: GetAll,
  GET_BY_ID: GetById,
  CREATE: Create,
  UPDATE_BY_ID: UpdateById,
  DELETE_BY_ID: DeleteById,
};
