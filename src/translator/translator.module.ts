import { Module } from '@nestjs/common';
import { TranslatesModule } from 'src/database/translates/translates.module';
import { TranslateResolver } from './translator.resolver';
import { TranslatorService } from './translator.service';

@Module({
  imports: [TranslatesModule],
  providers: [TranslatorService, TranslateResolver],
})
export class TranslatorModule {}
