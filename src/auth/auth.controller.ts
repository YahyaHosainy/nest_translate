import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { Request } from 'express';
import { ValidationPipe } from 'src/common/validation.pipe';
import { User } from 'src/database/user.entity';
import { UsersService } from 'src/database/users/users.service';
import { CreateUser } from './auth.validator';
import { LocalAuthGuard } from './local.strategy/guard';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/common/decorators/publicRoute';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ){}

  @Post('signin')
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  signin(@Req() req: Request) {
    return this.authService.login(req.user)
  }

  @Post('signup')
  @PublicRoute()
  async signup(
    @Body(new ValidationPipe()) createUser: CreateUser,
  ) {
    let user = new User()
    user.fullName = createUser.fullName
    user.email = createUser.email
    user.password = await bcrypt.hash(createUser.password, 10);
    await this.usersService.usersRepository.save(user)

    return this.authService.login(user)
  }
  
}
