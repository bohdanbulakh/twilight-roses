import { UserEntity } from '../../../database/entities/user.entity';
import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';

export type UserWithToken = UserEntity & { token: RefreshTokenEntity }
