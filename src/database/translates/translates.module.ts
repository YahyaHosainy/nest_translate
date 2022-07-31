import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translate } from '../translate.entity';
import { TranslatesService } from './translates.service';


@Module({
  imports: [TypeOrmModule.forFeature([Translate])],
  providers: [TranslatesService],
  exports: [TranslatesService]
})
export class TranslatesModule {}
