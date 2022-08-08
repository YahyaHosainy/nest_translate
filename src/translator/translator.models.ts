import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { TranslateInterface } from 'src/interfaces/translate.interface';
import { NoHistoryUserObject } from 'src/user/user.models';
import { DateScalar } from './translator.scalar';

/*
|--------------------------------------------------------------------------
| Translator GraphQL object types
|--------------------------------------------------------------------------
|
| Specify all object types for translate resolver.
|
*/

/**
 * Input type for new translate request comming from client
 *
 * @export
 * @class NewTranslateInput
 */
@InputType()
export class NewTranslateInput {
  @Field({ nullable: true })
  from?: string;

  @Field()
  to: string;

  @Field()
  text: string;
}

/**
 * Translate object type without user object.
 * useful when it comes under user object.
 * Like: User { id, fullName, ..., history }
 *                                    ^
 *                                    |
 * here we don't need user object on ever translate
 * object because it already comes under a user object.
 *
 * @export
 * @class NoUserTranslateObject
 */
@ObjectType()
export class NoUserTranslateObject {
  @Field(() => Int)
  id: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  message: string;

  @Field()
  translated: string;

  @Field((type) => DateScalar)
  date: number;
}

/**
 * Translate object with user object.
 * useful when user wanna fetch
 * his translates history independently.
 *
 * @export
 * @class TranslateObject
 * @extends {NoUserTranslateObject}
 * @implements {TranslateInterface}
 */
@ObjectType()
export class TranslateObject
  extends NoUserTranslateObject
  implements TranslateInterface
{
  @Field((type) => NoHistoryUserObject)
  user: NoHistoryUserObject;
}
