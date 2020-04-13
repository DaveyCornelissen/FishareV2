import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IdentityService } from '../../identity/identity.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly IdentityService: IdentityService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const identity = await this.IdentityService.validateIdentity(username, password);
    if (!identity) {
      throw new UnauthorizedException();
    }
    return identity;
  }
}