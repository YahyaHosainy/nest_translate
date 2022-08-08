import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UsersModule } from 'src/database/users/users.module';

/*
|--------------------------------------------------------------------------
| User GraphQL module
|--------------------------------------------------------------------------
|
| This module is for dealing with user obejct.
| import user module from database module
|
*/

@Module({
  imports: [UsersModule],
  providers: [UserResolver],
})
export class UserModule {}
