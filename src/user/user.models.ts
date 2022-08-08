import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  PoorUserInterface,
  UserInterface,
} from 'src/interfaces/user.interface';
import { NoUserTranslateObject } from 'src/translator/translator.models';

@ObjectType()
export class NoHistoryUserObject implements PoorUserInterface {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  fullName: string;
}

@ObjectType()
export class UserObject extends NoHistoryUserObject implements UserInterface {
  @Field((type) => [NoUserTranslateObject])
  history: NoUserTranslateObject[];
}
