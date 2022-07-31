import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TranslateInterface } from 'src/database/translate.entity';
import { User, UserInterface } from 'src/database/user.entity';

@InputType()
export class NewTranslateInput {
  @Field({ nullable: true })
  from?: string;

  @Field()
  to: string;

  @Field()
  text: string;
}

@ObjectType()
export class UserObject implements UserInterface {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  fullName: string;

  // @Field()
  history: TranslateObject[];
}

@ObjectType()
export class TranslateObject implements TranslateInterface {
  @Field()
  id: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  messate: string;

  @Field()
  translated: string;

  @Field()
  user: number;
}
