import ConfigInterface from "./type.config"

export const config: ConfigInterface = {
  HOST: 'localhost',
  PORT: 3000,
  DB_TYPE: 'postgres',
  DB_HOST: '127.0.0.1',
  DB_PORT: 5432,
  DB_DATABASE: 'translator',
  DB_USERNAME: 'root',
  DB_PASSWORD: '',
  JWT_SECRET: 'secretKey',
}

export default config;
