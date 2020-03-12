import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://fishare-auth-db:27017/authentication?authSource=admin', {
      user: 'admin',
      pass: 'admin'
    }),
  ]
})
export class AppModule {}
