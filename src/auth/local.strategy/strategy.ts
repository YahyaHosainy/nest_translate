import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PrivateUserInterface } from 'src/interfaces/user.interface';

/*
|--------------------------------------------------------------------------
| Local strategy class
|--------------------------------------------------------------------------
|
| For makking Local (username, password) strategy and validate the user object.
|
*/

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of LocalStrategy.
   * @param {AuthService} authService
   * @memberof LocalStrategy
   */
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * Check if we have user on database and password is correct.
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise<PrivateUserInterface>}
   * @memberof LocalStrategy
   */
  async validate(
    email: string,
    password: string,
  ): Promise<PrivateUserInterface> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
