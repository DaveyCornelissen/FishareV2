import { Module } from '@nestjs/common';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule} from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './core/config/configuration';
import dbconfiguration from './core/config/database.configuration';
import rabbitConfiguration from './core/config/rabbit.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, dbconfiguration, rabbitConfiguration],
      isGlobal: true,
      envFilePath: ['.env', 'dev.env']
    }),
    IdentityModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.URL')
      }),
      inject: [ConfigService],
    }),
  ],
  providers: []
})
export class AppModule {}
