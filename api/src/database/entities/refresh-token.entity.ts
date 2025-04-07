import { UserEntity } from './user.entity';

export class RefreshTokenEntity {
  id: string;
  token: string;
  user?: UserEntity;
  userId: string | null;
  createdAt: Date;
}
