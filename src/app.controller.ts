import { Controller, Get, Req } from '@nestjs/common';
import { Request } from "express"
import { UsersService } from './database/users/users.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService
  ) {}

  async getHistory(@Req() req: Request) {
    let data = await this.usersService.usersRepository.find({
      where: {
        id: req.user.id,
      },
      relations: {
        history: true,
      },
      take: 1
    })

    const { password, ...rest } = data[0]
    return rest
  }
}
