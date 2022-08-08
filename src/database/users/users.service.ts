import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoorUserInterface } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

/*
|--------------------------------------------------------------------------
| User Service of the module
|--------------------------------------------------------------------------
|
| This nest service is for User module to make operations easy and export the
| public repository for other operations.
|
*/

@Injectable()
export class UsersService {
  /**
   * Creates an instance of UsersService.
   * @param {Repository<User>} usersRepository
   * @memberof UsersService
   */
  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>,
  ) {}

  async findOneWithHistory(
    id: number,
    // limit: number = 35,
    // offset: number = 0,
  ): Promise<PoorUserInterface> {
    let user: PoorUserInterface[] = await this.usersRepository.find({
      select: {
        id: true,
        email: true,
        fullName: true,
        history: true,
      },
      where: {
        id,
      },
      take: 1,
      relations: {
        history: true,
      },
    });
    return user[0];
  }
}
