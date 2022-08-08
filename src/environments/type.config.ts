import { DatabaseType } from 'typeorm';

/*
|--------------------------------------------------------------------------
| Types of environment variables
|--------------------------------------------------------------------------
|
| To make sure they have valid types.
|
*/

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConfigInterface {
      NODE_ENV: string;
    }
  }
}

export default interface ConfigInterface {
  HOST: string;
  PORT: number;
  DB_TYPE: DatabaseType;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
}
