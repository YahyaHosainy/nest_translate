import { TranslateInterface } from 'src/interfaces/translate.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from './user.entity';

/*
|--------------------------------------------------------------------------
| Create The Translate Entity
|--------------------------------------------------------------------------
|
| This is Translate model which is using for keep track of translation history.
| The entity will create the table and handle the data query and entry for us.
|
*/

/**
 * Translate Model Structure
 *
 * @export
 * @class Translate
 * @extends {BaseEntity} for make manage actions available (Update, Delete ...)
 * @implements {TranslateInterface} to make sure we have all needed and correct columns
 */
@Entity()
export class Translate extends BaseEntity implements TranslateInterface {
  /**
   * Auto increment table unique ID
   *
   * @type {number}
   * @memberof Translate
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Shows code of the being translated language
   *
   * @type {string}
   * @memberof Translate
   */
  @Column()
  from: string;

  /**
   * Shows code of target language
   *
   * @type {string}
   * @memberof Translate
   */
  @Column()
  to: string;

  /**
   * Un-translated text
   *
   * @type {string}
   * @memberof Translate
   */
  @Column()
  message: string;

  /**
   * Translated text
   *
   * @type {string}
   * @memberof Translate
   */
  @Column()
  translated: string;

  /**
   * Save the time of the record
   *
   * @type {number}
   * @memberof Translate
   */
  @Column({ type: 'bigint' })
  date: number;

  /**
   * Shows the owner of the translate history, (Only for internal use)
   *
   * @type {User}
   * @memberof Translate
   */
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
