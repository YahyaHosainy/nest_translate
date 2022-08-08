import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/database/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  PrivateUserInterface,
  PoorUserInterface,
} from 'src/interfaces/user.interface';

/*
|--------------------------------------------------------------------------
| Auth Service Class
|--------------------------------------------------------------------------
|
| This class is for checking user credentials and for sign JWT tokens.
|
*/

@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService. and UsersService
   * @param {UsersService} usersService For user operations
   * @param {JwtService} jwtService For sign tokens
   * @memberof AuthService
   */
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Checking if user can be found and password is the same
   *
   * @param {string} username User's username (in this case user's email)
   * @param {string} password Account password
   * @return {*} User poor object (only public info without translate history) or NULL
   * @memberof AuthService
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<PrivateUserInterface | null> {
    const user: PrivateUserInterface =
      await this.usersService.usersRepository.findOneBy({
        email: username,
      });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  /**
   * For generating access token
   *
   * @param {User} user User entity
   * @return {Promise<{
   *     access_token: string;
   *   }>}
   * @memberof AuthService
   */
  async login(user: PoorUserInterface): Promise<{
    access_token: string;
  }> {
    const payload: PoorUserInterface & { sub: number } = {
      sub: user.id,
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
