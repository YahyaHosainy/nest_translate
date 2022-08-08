import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/publicRoute';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Observable } from 'rxjs';
import { AuthenticationError } from 'apollo-server-express';

/*
|--------------------------------------------------------------------------
| Guard class for jwt strategy
|--------------------------------------------------------------------------
|
| This class doing two things,
| 1) it extends main auth guard for jwt strategy.
| 2) it handles public routes.
| 3) it binds request object to GQ context object.
|
*/

/**
 * JwtAuthGuard class
 *
 * @export
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Creates an instance of JwtAuthGuard.
   * @param {Reflector} reflector
   * @memberof JwtAuthGuard
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * canActivate methdo
   *
   * Checks for being public and bids the request object to GQ context.
   *
   * @param {ExecutionContext} context
   * @return {(boolean | Promise<boolean> | Observable<boolean>)}
   * @memberof JwtAuthGuard
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Public route check
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Bind requst and respose objects
    const ctx = GqlExecutionContext.create(context);
    const { req, res } = ctx.getContext();

    // call parent construct for checking auth
    return super.canActivate(new ExecutionContextHost([req, res]));
  }

  // throw error if user not exists
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
