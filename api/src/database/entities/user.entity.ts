import { UserType } from '@prisma/client';
import { OrderEntity } from './order.entity';

export class UserEntity {
  id: string;
  email: string;
  username: string | null;
  firstName: string;
  lastName: string | null;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
  orders?: OrderEntity[];
}
