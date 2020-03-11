import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/authentication'),
  ]
})
export class AppModule {}
