import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.use((req,res,next)=>{
    if(req.secure){
      return helmet()
    }
    next()
  }); 
  app.enableCors({
    allowedHeaders: '*',
    origin:'*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Architecture')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app
    .listen(process.env.PORT)
    .then(() => console.log('Server is running on port ' + process.env.PORT))
    .catch((err) => console.log(err));
}
bootstrap();
