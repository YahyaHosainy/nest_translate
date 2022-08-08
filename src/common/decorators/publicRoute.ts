import { SetMetadata } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| Public route decorator
|--------------------------------------------------------------------------
|
| this decorator bind a metadata for routes that will check by JWT guard. 
|
*/

export const IS_PUBLIC_KEY = 'publicRoute';
export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);
