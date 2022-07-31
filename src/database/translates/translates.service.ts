import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translate } from '../translate.entity';

@Injectable()
export class TranslatesService {
  constructor(
    @InjectRepository(Translate)
    public translatesRepository: Repository<Translate>,
  ) {}
}
