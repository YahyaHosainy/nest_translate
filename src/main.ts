import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import environments from 'src/environments/current';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrivateUserInterface } from './interfaces/user.interface';

/*
|--------------------------------------------------------------------------
| Bootstrapping app
|--------------------------------------------------------------------------
|
| For creating server instance.
|
*/

/**
 * Declare User object of Express request
 */
declare global {
  namespace Express {
    interface User extends PrivateUserInterface {}
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(environments.PORT);
}
bootstrap();
