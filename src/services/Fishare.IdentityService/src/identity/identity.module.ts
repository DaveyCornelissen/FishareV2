import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { LocalStrategy } from '../core/interceptors/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../core/interceptors/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentitySchema } from './identity.schema';
import { PasswordService } from 'src/core/services/password/password.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    MongooseModule.forFeature([{ name: 'Identity', schema: IdentitySchema }])
  ],
  controllers: [IdentityController],
  providers: [IdentityService, LocalStrategy, JwtStrategy, PasswordService],
  exports: [IdentityModule]
})
export class IdentityModule { }
