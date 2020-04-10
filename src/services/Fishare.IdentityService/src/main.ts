import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './core/filters/allExceptionFilter';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {

  const app = await NestFactory.create(
    AppModule
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('app.port');
  const name = configService.get<string>('app.name');

  await app.listen(port);
  app.useGlobalFilters(new AllExceptionFilter());

  console.log(`${name} is now listening on port: ${port}`)
  const options = new DocumentBuilder()
    .setTitle('Auth-service')
    .setDescription('The authenication service for the fishare api')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
}
bootstrap();
