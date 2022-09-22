import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet = require('helmet');
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './base/exceptions/exception-filters';
import { LoggerService } from './base/logger/logger.service';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const logger = app.get(LoggerService);
  
  app.useGlobalFilters(new AllExceptionsFilter(logger));


  // Configuración de prefijo a nivel servicio
  app.setGlobalPrefix('api');

  app.use(helmet({
    hsts:{
      maxAge: 31536000,
      preload:true
    }
  }));

  if(configService.get('env_prod') == 'false'){
    const APP_NAME = configService.get('app_name');

    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(`The ${APP_NAME} API description`)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }


  await app.listen(app.get('ConfigService').get('app.port'));
}
bootstrap();
