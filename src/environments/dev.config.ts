import ConfigInterface from './type.config';

/*
|--------------------------------------------------------------------------
| Development variables
|--------------------------------------------------------------------------
|
| Development environment variables declaration.
|
*/

export const config: ConfigInterface = {
  // App host
  HOST: 'localhost',
  PORT: 3000,

  // database
  DB_TYPE: 'postgres',
  DB_HOST: '127.0.0.1',
  DB_PORT: 5432,
  DB_DATABASE: 'translator',
  DB_USERNAME: 'hosainy',
  DB_PASSWORD: 'hosainy123',

  // jwt
  JWT_SECRET: 'key123456789',
};

export default config;
