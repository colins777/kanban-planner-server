import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');  // Prefix every route with '/api'
    app.use(cookieParser());     // Middleware for parsing cookies

    // Enable CORS with specific options
    app.enableCors({
        origin: "http://localhost:3000",  // Client's URL without a trailing slash
        credentials: true,                // Required if you're dealing with cookies
        exposedHeaders: ['set-cookie'],   // Typically not necessary to expose 'set-cookie'
    });

    await app.listen(4200);  // Server port
    console.log(`Application running at ${await app.getUrl()}`);
}

bootstrap();
