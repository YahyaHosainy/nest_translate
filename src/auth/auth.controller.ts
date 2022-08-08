import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { Request } from 'express';
import { ValidationPipe } from 'src/common/validation.pipe';
import { User } from 'src/database/user.entity';
import { CreateUser } from './auth.validator';
import { LocalAuthGuard } from './local.strategy/guard';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/common/decorators/publicRoute';

/*
|--------------------------------------------------------------------------
| Auth controller
|--------------------------------------------------------------------------
|
| For controlling authentication requests.
| Has a signin and a signup methods.
|
*/

/**
 * Auth Class
 *
 * @export
 * @class AuthController
 */
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param {AuthService} authService
   * @memberof AuthController
   */
  constructor(private authService: AuthService) {}

  /**
   * Login request which contains user's credentials.
   *
   * @param {Request} req
   * @return {Promise<{
   *     access_token: string;
   *   }>}
   * @memberof AuthController
   */
  @Post('signin')
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  signin(@Req() req: Request): Promise<{
    access_token: string;
  }> {
    return this.authService.login(req.user);
  }

  /**
   * Create a new user route
   *
   * @param {CreateUser} createUser
   * @return {Promise<{
   *     access_token: string;
   *   }>}
   * @memberof AuthController
   */
  @Post('signup')
  @PublicRoute()
  async signup(@Body(new ValidationPipe()) createUser: CreateUser): Promise<{
    access_token: string;
  }> {
    let user = new User();
    user.fullName = createUser.fullName;
    user.email = createUser.email;
    user.password = await bcrypt.hash(createUser.password, 10);
    await user.save();

    return this.authService.login(user);
  }
}
