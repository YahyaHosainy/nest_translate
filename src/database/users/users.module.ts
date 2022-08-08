import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../user.entity';

/*
|--------------------------------------------------------------------------
| Database User Module
|--------------------------------------------------------------------------
|
| This module will be used for database operations
| We init the TypeORM repository here and also we made helpful methods for this purpose.
| And we exported it.
|
*/

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService],
})
export class UsersModule {}
