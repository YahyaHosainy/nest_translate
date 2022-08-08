import { Injectable } from '@nestjs/common';
const translate = require('@vitalets/google-translate-api');

/*
|--------------------------------------------------------------------------
| Translator services
|--------------------------------------------------------------------------
|
| Used for translation service.
|
*/

/**
 * Param type of translate method
 *
 * @interface translateParams
 */
interface translateParams {
  from: string;
  to: string;
  text: string;
}

@Injectable()
export class TranslatorService {
  constructor() {}

  /**
   * Receives text and target lanuage and return translation
   *
   * @param {translateParams} { from, to, text }
   * @return {Promise<{
   *     from: string;
   *     to: string;
   *     translated: string;
   *   }>}
   * @memberof TranslatorService
   */
  async translate({ from, to, text }: translateParams): Promise<{
    from: string;
    to: string;
    translated: string;
  }> {
    // make translation options
    let langOption: { from?: string; to: string } = { to: to };
    if (from) langOption.from = from;

    // Request for translate
    let res = await translate(text, langOption);

    // Get the response text and source lang.
    let translated: string = res.text;
    from = res.from.language.iso;

    // Return translation
    return {
      from,
      to,
      translated,
    };
  }
}
