import { Scalar, CustomScalar } from '@nestjs/graphql';
import { ValueNode, Kind } from 'graphql';

/*
|--------------------------------------------------------------------------
| Date scalar
|--------------------------------------------------------------------------
|
| We made a scalar type for date, which serializes date in milisecods form
| and send it as a user friendly string to client.
|
*/

/**
 * Date scalar
 *
 * @export
 * @class DateScalar
 * @implements {CustomScalar<string, number>}
 */
@Scalar('Date')
export class DateScalar implements CustomScalar<string, number> {
  /**
   * lets users know what type is it.
   *
   * @memberof DateScalar
   */
  description = 'Date type, receives miliseconds and sends string';

  /**
   * Parse comming requrst from input types.
   *
   * @param {number} value
   * @return {number}
   * @memberof DateScalar
   */
  parseValue(value: number): number {
    return new Date(value).getTime(); // value from the client
  }

  /**
   * Send date as string to client.
   *
   * @param {number} value
   * @return {*}  {string}
   * @memberof DateScalar
   */
  serialize(value: number): string {
    let date = new Date();
    date.setTime(value);
    return date.toUTCString(); // value sent to the client
  }

  /**
   * Parse and return comming request from params.
   *
   * @param {ValueNode} ast
   * @return {*}  {number}
   * @memberof DateScalar
   */
  parseLiteral(ast: ValueNode): number {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value).getTime();
    }
    return null;
  }
}
