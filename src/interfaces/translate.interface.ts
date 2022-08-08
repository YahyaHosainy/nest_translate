import { PoorUserInterface } from './user.interface';

/*
|--------------------------------------------------------------------------
| Translate entity types
|--------------------------------------------------------------------------
|
| Different types of translate object for different purposes.
|
*/

/**
 * Translate object without user member.
 * is useful when comming on sub documents of a user object.
 *
 * @export
 * @interface PoorTranslateInterface
 */
export interface PoorTranslateInterface {
  id: number;
  from: string;
  to: string;
  message: string;
  translated: string;
  date: number;
}

/**
 * Complete translate object with user member.
 *
 * @export
 * @interface TranslateInterface
 * @extends {PoorTranslateInterface}
 */
export interface TranslateInterface extends PoorTranslateInterface {
  user: PoorUserInterface;
}
