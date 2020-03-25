import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule} from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
    }),    
    // MongooseModule.forRoot(`mongodb://${process.env.DATABASE_CONTAINER}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=admin`, {
    //   user: process.env.DATABASE_USERNAME,
    //   pass: process.env.DATABASE_PASSWORD
    // }),
  ]
})
export class AppModule {
  constructor() {
    console.log(process.env.DATABASE_CONTAINER);
  }
}
