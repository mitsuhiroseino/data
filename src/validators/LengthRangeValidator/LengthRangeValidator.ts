import { i18nResources } from '@visue/i18n';
import size from 'lodash/size';
import ValidatorBase from '../ValidatorBase';
import { RangeValidatorConfig } from './types';

const DEFAULT_MESSAGE = 'message-validator-lengthrange-error';
i18nResources.updateDefault({
  [DEFAULT_MESSAGE]: '{minLength}以上、{maxLength}以下の長さで入力してください。',
});

/**
 * 文字列の桁数、配列・オブジェクトの要素数が指定の範囲内か
 */
class LengthRangeValidator<C extends RangeValidatorConfig = RangeValidatorConfig> extends ValidatorBase<
  string | unknown[] | { [key: string]: unknown },
  C
> {
  protected _getDefaultMessage() {
    return DEFAULT_MESSAGE;
  }

  protected _validate(target: string | unknown[] | { [key: string]: unknown }): boolean {
    const length = size(target);
    return length >= this.config.minLength && length <= this.config.maxLength;
  }
}
export default LengthRangeValidator;
