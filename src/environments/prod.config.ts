import ConfigInterface from './type.config';

/*
|--------------------------------------------------------------------------
| Production variables
|--------------------------------------------------------------------------
|
| Production environment variables declaration.
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
  DB_USERNAME: 'root',
  DB_PASSWORD: '',

  // jwt
  JWT_SECRET: 'secretKey',
};

export default config;
