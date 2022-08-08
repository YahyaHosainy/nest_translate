import { IsString, IsEmail } from 'class-validator';

/*
|--------------------------------------------------------------------------
| Validation Class
|--------------------------------------------------------------------------
|
| This class is for validating if comming user object from client side is
| correct and can be created.
|
*/

/**
 * User Validation Class
 *
 * @export
 * @class CreateUser
 */
export class CreateUser {
  /**
   * Request should have email option with email role
   *
   * @type {string}
   * @memberof CreateUser
   */
  @IsEmail({ message: 'Email is required!' })
  email: string;

  /**
   * Request should have full name field
   *
   * @type {string}
   * @memberof CreateUser
   */
  @IsString({ message: 'Full name is required!' })
  fullName: string;

  /**
   * Request should have a password field
   *
   * @type {string}
   * @memberof CreateUser
   */
  @IsString({ message: 'You should choose a password for continue!' })
  password: string;
}
