import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import environments from 'src/environments/current';
import { UserInterface } from "./database/user.entity"
import { NestExpressApplication } from '@nestjs/platform-express';

/**
 * Declare User object of Express request
 */
declare global {
  namespace Express {
    interface User extends UserInterface {}
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(environments.PORT);
}
bootstrap();
