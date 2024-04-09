import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //add /api to every request
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    //port of front end part - client
    origin: ['http://localhost:3001'],
     // origin: "*",
    //credentials: true,app.controller.ts
    //not required
    exposedHeaders: 'set-cookie'

  })

  //await app.listen(3000);
 await app.listen(4200);

  console.log(`Application running at ${await app.getUrl()}`)

  //await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
