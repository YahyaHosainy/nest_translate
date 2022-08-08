import { PoorTranslateInterface } from './translate.interface';

/*
|--------------------------------------------------------------------------
| User entity types
|--------------------------------------------------------------------------
|
| Different types of user object for different purposes.
|
*/

/**
 * Public and send-able to client
 *
 * @export
 * @interface PoorUserInterface
 */
export interface PoorUserInterface {
  id: number;
  email: string;
  fullName: string;
}

/**
 * Complete user interface with history member.
 *
 * @export
 * @interface UserInterface
 * @extends {PoorUserInterface}
 */
export interface UserInterface extends PoorUserInterface {
  history: PoorTranslateInterface[];
}

/**
 * Private user interface only for internal use with password field.
 *
 * @export
 * @interface PrivateUserInterface
 * @extends {PoorUserInterface}
 */
export interface PrivateUserInterface extends PoorUserInterface {
  password: string;
}
