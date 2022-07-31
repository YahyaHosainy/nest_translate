import ConfigInterface from "./type.config"

export const config: ConfigInterface = {
  HOST: 'localhost',
  PORT: 3000,
  DB_TYPE: 'postgres',
  DB_HOST: '127.0.0.1',
  DB_PORT: 5432,
  DB_DATABASE: 'translator',
  DB_USERNAME: 'hosainy',
  DB_PASSWORD: 'hosainy123',
  JWT_SECRET: 'key123456789',
}

export default config;
