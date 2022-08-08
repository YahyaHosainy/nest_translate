import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translate } from '../translate.entity';
import { User } from '../user.entity';

/*
|--------------------------------------------------------------------------
| Translate module Service
|--------------------------------------------------------------------------
|
| This nest service is for Translate module to make operations easy and export the
| public repository for other operations.
|
*/

interface CreateTranslateObjectParam {
  from: string;
  to: string;
  text: string;
  translated: string;
  user: User;
}

/**
 * Service class
 *
 * @export
 * @class TranslatesService
 */
@Injectable()
export class TranslatesService {
  /**
   * Creates an instance of TranslatesService.
   * @param {Repository<Translate>} translatesRepository
   * @memberof TranslatesService
   */
  constructor(
    @InjectRepository(Translate)
    public translatesRepository: Repository<Translate>,
  ) {}

  /**
   * For easily making a new translation record
   *
   * @param {CreateTranslateObjectParam} {
   *     from,
   *     to,
   *     text,
   *     translated,
   *     user,
   *   }
   * @return {Promise<Translate>}
   * @memberof TranslatesService
   */
  async createTranslate({
    from,
    to,
    text,
    translated,
    user,
  }: CreateTranslateObjectParam): Promise<Translate> {
    let translate = new Translate();
    translate.from = from;
    translate.to = to;
    translate.message = text;
    translate.translated = translated;
    translate.date = Date.now();
    translate.user = user;
    await translate.save();

    return translate;
  }

  /**
   * To find all translation history with their user objects
   *
   * @param {number} id => user.id
   * @param {number} [limit=35]
   * @param {number} [offset=0]
   * @return {Promise<Translate[]>}
   * @memberof TranslatesService
   */
  fetch(
    id: number,
    limit: number = 35,
    offset: number = 0,
  ): Promise<Translate[]> {
    return this.translatesRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id,
        },
      },
      take: limit,
      skip: offset,
      order: {
        date: 'DESC',
      },
      cache: true,
    });
  }
}
