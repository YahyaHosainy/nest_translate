import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NewTranslateInput, TranslateObject } from './translator.model';
import { TranslatorService } from './translator.service';
const translate = require('@vitalets/google-translate-api');
import { Translate } from 'src/database/translate.entity';
import { gqUser } from 'src/common/decorators/gqUser';
import { User } from 'src/database/user.entity';
import { Req } from '@nestjs/common';
import { Request } from 'express';

@Resolver(() => TranslateObject)
export class TranslateResolver {

  constructor(
    private readonly translatorService: TranslatorService
  ) {}

  @Query(() => [TranslateObject])
  findAll() {
    return this.translatorService.getAll()
  }

  @Mutation(() => TranslateObject)
  async create(@Args('newTranslateInput') args: NewTranslateInput, @gqUser() user: User): Promise<Translate> {
    console.log('user',user)

    let langOption: {from?: string; to:string} = { to: args.to }
    if (args.from) langOption.from = args.from;

    let res = await translate(args.text, langOption)

    let translated: string = res.text
    args.from = res.from.language.iso


    let trans = await this.translatorService.createTranslate({
      from: args.from,
      to: args.to,
      text: args.text,
      translated,
      user: user.id
    })

    return trans
  }
}
