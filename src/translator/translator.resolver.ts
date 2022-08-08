import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import {
  NewTranslateInput,
  NoUserTranslateObject,
  TranslateObject,
} from './translator.models';
import { gqUser } from 'src/common/decorators/gqUser';
import { User } from 'src/database/user.entity';
import { TranslatesService } from 'src/database/translates/translates.service';
import { Translate } from 'src/database/translate.entity';
import { PrivateUserInterface } from 'src/interfaces/user.interface';
import { TranslatorService } from './translator.service';

/*
|--------------------------------------------------------------------------
| Translator main resolver
|--------------------------------------------------------------------------
|
| This resolver uses code first approach, thus the mutation and query
| types will be made by it automatically.
|
*/

@Resolver(() => TranslateObject)
export class TranslateResolver {
  /**
   * Creates an instance of TranslateResolver & TranslatorService.
   * @param {TranslatesService} translateService
   * @param {TranslatorService} translatorService
   * @memberof TranslateResolver
   */
  constructor(
    private readonly translateService: TranslatesService,
    private translatorService: TranslatorService,
  ) {}

  /**
   * Fetch all translations, also supports pagination.
   *
   * @param {PrivateUserInterface} user getting user from context we made already.
   * @param {number} [limit] make respose limit (35 by default)
   * @param {number} [offset] offset of selection (0 default)
   * @return {Promise<Translate[]>}
   * @memberof TranslateResolver
   */
  @Query(() => [TranslateObject])
  translations(
    @gqUser() user: PrivateUserInterface,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('offset', { nullable: true, type: () => Int }) offset?: number,
  ): Promise<Translate[]> {
    return this.translateService.fetch(user.id, limit, offset);
  }

  /**
   * For creating new translation.
   *
   * @param {NewTranslateInput} args of comming request (from, to, text)
   * @param {User} user current user
   * @return {Promise<NoUserTranslateObject>}
   * @memberof TranslateResolver
   */
  @Mutation(() => NoUserTranslateObject)
  async create(
    @Args('newTranslateInput') args: NewTranslateInput,
    @gqUser() user: User,
  ): Promise<NoUserTranslateObject> {
    // Translates the text
    const { from, to, translated } = await this.translatorService.translate({
      from: args.from,
      to: args.to,
      text: args.text,
    });

    // Insert record to database for making history.
    let trans = await this.translateService.createTranslate({
      from,
      to,
      text: args.text,
      translated,
      user: user,
    });

    // Return respose to client
    return {
      id: trans.id,
      from: trans.from,
      to: trans.to,
      message: trans.message,
      translated: trans.translated,
      date: trans.date,
    };
  }
}
