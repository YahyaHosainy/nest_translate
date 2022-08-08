import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/*
|--------------------------------------------------------------------------
| Validator class
|--------------------------------------------------------------------------
|
| This class made for validating validation classes which are using by 
| controllers.
|
*/

/**
 * Validation Class
 *
 * @export
 * @class ValidationPipe
 * @implements {PipeTransform<any>}
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  /**
   * Main method for transforming data to end of pipe
   *
   * @param {*} value
   * @param {ArgumentMetadata} { metatype }
   * @return {Promise<any>}
   * @memberof ValidationPipe
   */
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    // Check for valid types
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Converts plain (literal) object to class (constructor) object. Also works with arrays.
    const object = plainToInstance(metatype, value);
    // Validates given object.
    const errors = await validate(object);

    // if error throw BadRequestException
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  /**
   * Check if type is a valid type befor performing validation action.
   *
   * @private
   * @param {Function} metatype
   * @return {boolean}
   * @memberof ValidationPipe
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
