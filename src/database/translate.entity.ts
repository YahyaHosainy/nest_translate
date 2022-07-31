import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export interface TranslateInterface {
  id: number;
  from: string;
  to: string;
  messate: string;
  translated: string;
  user: number;
}

@Entity()
export class Translate implements TranslateInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  messate: string;

  @Column()
  translated: string;

  @ManyToOne(() => User, (user) => user.id)
  user: number;
}
