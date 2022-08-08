import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Translate } from './translate.entity';
import { User } from './user.entity';
import { UsersModule } from './users/users.module';
import { TranslatesModule } from './translates/translates.module';
import environments from 'src/environments/current';

/*
|--------------------------------------------------------------------------
| Database module
|--------------------------------------------------------------------------
|
| This module will be used for connecting to database, creating entities (tables),
| And managing the data entry and our fetch queries.
|
*/

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: environments.DB_TYPE,
      host: environments.DB_HOST,
      port: environments.DB_PORT,
      username: environments.DB_USERNAME,
      password: environments.DB_PASSWORD,
      database: environments.DB_DATABASE,
      entities: [User, Translate],
      synchronize: true,
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    TranslatesModule,
  ],
  exports: [UsersModule],
})
export class DatabaseModule {}
