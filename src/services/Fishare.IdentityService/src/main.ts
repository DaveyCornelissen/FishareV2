import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './core/filters/allExceptionFilter';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // microservice #RabbitMQ 
  // const rabbitMq = app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://user:password@localhost:5672/Fishare-Vhost'],
  //     queue: 'UserQueue',
  //     queueOptions: {
  //       durable: false
  //     }
  //   }
  // });

  //get enviroment vars
  const configService = app.get(ConfigService);
  const port = configService.get<string>('app.port');
  const name = configService.get<string>('app.name');

  //setup middlewares
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  //add swaggerUI
  const options = new DocumentBuilder()
    .setTitle('Identity-service')
    .setDescription('The Identity service for the fishare api')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  

  //starting the hybrid mircoservices
  // await app.startAllMicroservicesAsync();
  await app.listen(port);

  console.log(`${name} is now listening on port: ${port}`)
}
bootstrap();
