import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../core/config/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentitySchema } from './identity.schema';
import { PasswordService } from 'src/core/services/password/password.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IDENTITY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672/fishare_Vhost'],
          queue: 'user.queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    MongooseModule.forFeature([{ name: 'Identity', schema: IdentitySchema }])
  ],
  controllers: [IdentityController],
  providers: [IdentityService, PasswordService],
  exports: [IdentityModule]
})
export class IdentityModule { }
