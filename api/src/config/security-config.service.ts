import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfigService {
  constructor (private configService: ConfigService) {}

  get accessSecret (): string {
    return this.configService.get<string>('security.access.secret');
  }

  get accessTtl (): string {
    return this.configService.get<string>('security.access.ttl');
  }

  get refreshSecret (): string {
    return this.configService.get<string>('security.refresh.secret');
  }

  get refreshTtl (): string {
    return this.configService.get<string>('security.refresh.ttl');
  }

  get sessions (): number {
    return +this.configService.get<string>('security.sessions');
  }
}
