import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './core/filters/allExceptionFilter';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppConfigService } from './core/config/app/config.service';


async function bootstrap() {

  
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '',
        port: Number(process.env.APP_PORT)
      }
    }
  );


  
  await app.listen(()=> console.log("app is now listening...."));
  app.useGlobalFilters(new AllExceptionFilter());


  // const options = new DocumentBuilder()
  //   .setTitle('Auth-service')
  //   .setDescription('The authenication service for the fishare api')
  //   .setVersion('0.1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);
  
}
bootstrap();
