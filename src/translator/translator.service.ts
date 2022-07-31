import { Injectable } from '@nestjs/common';
import { Translate } from 'src/database/translate.entity';
import { TranslatesService } from 'src/database/translates/translates.service';
import { User } from 'src/database/user.entity';

interface CreateTranslateObjectParam {
  from: string;
  to: string;
  text: string;
  translated: string;
  user: number;
}

@Injectable()
export class TranslatorService {
  constructor(private readonly translateService: TranslatesService) {}

  async createTranslate({
    from,
    to,
    text,
    translated,
    user,
  }: CreateTranslateObjectParam): Promise<Translate> {
    let tr = new Translate();
    tr.from = from;
    tr.to = to;
    tr.messate = text;
    tr.translated = translated;
    tr.user = user;
    await this.translateService.translatesRepository.save(tr)

    return tr
  }

  getAll(){
    return this.translateService.translatesRepository.find()
  }
}
