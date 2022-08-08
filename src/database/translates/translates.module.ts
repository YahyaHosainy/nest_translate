import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translate } from '../translate.entity';
import { TranslatesService } from './translates.service';

/*
|--------------------------------------------------------------------------
| Database Translate Service Module
|--------------------------------------------------------------------------
|
| This module will be used for database operations
| We init the TypeORM repository here and also we made helpful methods for this purpose.
| And we exported it.
|
*/

@Module({
  imports: [TypeOrmModule.forFeature([Translate])],
  providers: [TranslatesService],
  exports: [TranslatesService],
})
export class TranslatesModule {}
