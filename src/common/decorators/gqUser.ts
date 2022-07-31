import { createParamDecorator } from '@nestjs/common';

// export const gqUser = createParamDecorator(
//   (data, req) => req.user,
// );

export const gqUser = createParamDecorator((data, req) => req.args[2].req.user);
