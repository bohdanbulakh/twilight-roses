import { UserType } from '@prisma/client';
import { OrderEntity } from './order.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

export class UserEntity {
  id: string;
  email: string;
  password: string | null;
  username: string | null;
  firstName: string;
  lastName: string | null;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
  orders?: OrderEntity[];
  refreshTokens: RefreshTokenEntity[];
}
