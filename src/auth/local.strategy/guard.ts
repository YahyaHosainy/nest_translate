import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*
|--------------------------------------------------------------------------
| Guard class for local strategy
|--------------------------------------------------------------------------
|
| This class is only maks calling this guard easier.
|
*/

/**
 * LocalAuthGuard Class
 *
 * @export
 * @class LocalAuthGuard
 * @extends {AuthGuard('local')} the main guard
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
