import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({autoLoadEntities: true})
  ]
})
export class AppModule {}
