import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import environment from 'src/environments/current';
import {
  PoorUserInterface,
  PrivateUserInterface,
} from 'src/interfaces/user.interface';
import { UsersService } from 'src/database/users/users.service';

/*
|--------------------------------------------------------------------------
| JWT strategy class
|--------------------------------------------------------------------------
|
| For makking JWT (with Berrer token) strategy and validate the user object.
|
*/

/**
 * JWT strategy class
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of JwtStrategy.
   * @param {UsersService} usersService
   * @memberof JwtStrategy
   */
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET,
    });
  }

  /**
   * Validate of user exists on database.
   *
   * @param {(PoorUserInterface & { sub: number })} payload
   * @return {Promise<User>}
   * @memberof JwtStrategy
   */
  async validate(
    payload: PoorUserInterface & { sub: number },
  ): Promise<PrivateUserInterface> {
    const user: PrivateUserInterface =
      await this.usersService.usersRepository.findOneBy({
        id: payload.id,
      });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
