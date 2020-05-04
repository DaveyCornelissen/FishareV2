import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../core/config/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentitySchema } from './identity.schema';
import { PasswordService } from 'src/core/services/password/password.service';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    MongooseModule.forFeature([{ name: 'Identity', schema: IdentitySchema }])
  ],
  controllers: [IdentityController],
  providers: [IdentityService, PasswordService,
    {
      provide: 'IDENTITY_SERVICE',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('rabbit.host');
        const port = configService.get<string>('rabbit.port');
        const user = configService.get<string>('rabbit.user');
        const pass = configService.get<string>('rabbit.pass');
        const queue = configService.get<string>('rabbit.queue');
        const vhost = configService.get<string>('rabbit.Vhost'); 
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${pass}@${host}:${port}/${vhost}`],
            queue: queue
          },
        });
      },
      inject: [ConfigService],
    }],
  exports: [IdentityModule]
})
export class IdentityModule { }
