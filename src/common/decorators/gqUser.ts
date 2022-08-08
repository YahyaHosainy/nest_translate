import { createParamDecorator } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| User decorator for GQ reslvers
|--------------------------------------------------------------------------
|
| It maks getting user object easier for resolvers.
|
*/

export const gqUser = createParamDecorator(
  (data, context) => context.args[2].req.user,
);
