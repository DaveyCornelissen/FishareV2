import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule} from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './core/config/app.configuration';
import dbconfiguration from './core/config/database.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, dbconfiguration],
      isGlobal: true,
      envFilePath: ['.env', 'dev.env']
    }),
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.URL')
      }),
      inject: [ConfigService], 
    // MongooseModule.forRoot(`mongodb://${process.env.DATABASE_CONTAINER}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=admin`, {
    //   user: process.env.DATABASE_USERNAME,
    //   pass: process.env.DATABASE_PASSWORD
    }),
  ]
})
export class AppModule {}