import { IsString, IsEmail } from 'class-validator';

export class CreateUser {
  @IsEmail({ message: 'Email is required!' })
  email: string;
  @IsString({ message: 'Full name is required!' })
  fullName: string;
  @IsString({ message: 'You should choose a password for continue!' })
  password: string;
}
