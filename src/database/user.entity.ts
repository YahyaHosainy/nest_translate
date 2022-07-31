import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Translate } from './translate.entity';

export interface UserInterface {
  id: number;
  email: string;
  fullName: string;
  password: string;
  history: Translate[];
}

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @OneToMany((type) => Translate, (translate) => translate.user)
  history: Translate[];
}
