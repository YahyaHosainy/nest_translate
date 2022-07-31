import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/database/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.usersRepository.findOneBy({
      email: username,
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, fullName: user.fullName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
