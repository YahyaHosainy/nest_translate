import { Module } from '@nestjs/common';
import { TranslatesModule } from 'src/database/translates/translates.module';
import { TranslateResolver } from './translator.resolver';
import { TranslatorService } from './translator.service';
import { DateScalar } from './translator.scalar';

/*
|--------------------------------------------------------------------------
| Translator module
|--------------------------------------------------------------------------
|
| Collects all translator functions and makes a module.
| imports TranslatesModule from database to do insertion operations
|
*/

@Module({
  imports: [TranslatesModule],
  providers: [TranslatorService, TranslateResolver, DateScalar],
})
export class TranslatorModule {}
