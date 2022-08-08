import { UserInterface } from 'src/interfaces/user.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Translate } from './translate.entity';

/*
|--------------------------------------------------------------------------
| Create The User Entity
|--------------------------------------------------------------------------
|
| This is our main user model of app using TypeORM.
| The entity will create the table and handle the data query and entry for us.
|
*/

/**
 * User Model Structure
 *
 * @export
 * @class User
 * @extends {BaseEntity} for make manage actions available (Update, Delete ...)
 * @implements {UserInterface} to make sure we have all needed and correct columns
 */
@Entity()
export class User extends BaseEntity implements UserInterface {
  /**
   * Auto increment table unique ID
   *
   * @type {number}
   * @memberof User
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Make an email column
   *
   * @type {string}
   * @memberof User
   */
  @Column({ unique: true })
  email: string;

  /**
   * For making a password column for our users
   *
   * @type {string}
   * @memberof User
   */
  @Column()
  password: string;

  /**
   * for saving User's full name
   *
   * @type {string}
   * @memberof User
   */
  @Column()
  fullName: string;

  /**
   * Shows the translate history, (Only for internal use)
   *
   * @type {Translate[]}
   * @memberof User
   */
  @OneToMany((type) => Translate, (translate) => translate.user)
  history: Translate[];
}
