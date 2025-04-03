import { UserEntity } from './user.entity';

export class RefreshTokenEntity {
  token: string;
  user?: UserEntity;
  userId: string | null;
  createdAt: Date;
}
