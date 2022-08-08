import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from 'src/database/users/users.service';
import { UserObject } from './user.models';
import { gqUser } from 'src/common/decorators/gqUser';
import { PoorUserInterface } from 'src/interfaces/user.interface';

/*
|--------------------------------------------------------------------------
| User GraphQL resolver
|--------------------------------------------------------------------------
|
| For providing user object through GQ.
|
*/

@Resolver(() => UserObject)
export class UserResolver {
  /**
   * Creates an instance of UserResolver.
   * @param {UsersService} usersService
   * @memberof UserResolver
   */
  constructor(private usersService: UsersService) {}

  /**
   * Provide user.
   * Tried to add pagination but TypeORM model doesn't support
   * limit and offset on relations.
   *
   * @param {PoorUserInterface} user
   * @return {Promise<PoorUserInterface>}
   * @memberof UserResolver
   */
  @Query(() => UserObject)
  user(
    @gqUser() user: PoorUserInterface,
    // @Args('limit', { nullable: true }) limit?: number,
    // @Args('offset', { nullable: true }) offset?: number,
  ): Promise<PoorUserInterface> {
    return this.usersService.findOneWithHistory(user.id /*, limit, offset */);
  }
}
