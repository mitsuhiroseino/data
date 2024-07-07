import { i18nResources } from '@visue/i18n';
import size from 'lodash/size';
import ValidatorBase from '../ValidatorBase';
import { MinLengthValidatorConfig } from './types';

const DEFAULT_MESSAGE = 'message-validator-minlength-error';
i18nResources.updateDefault({
  [DEFAULT_MESSAGE]: '長さは{minLength}以上にしてください。',
});

/**
 * 文字列の桁数、配列・オブジェクトの要素数が指定の数以上か
 */
class MinLengthValidator<C extends MinLengthValidatorConfig = MinLengthValidatorConfig> extends ValidatorBase<
  string | unknown[] | { [key: string]: unknown },
  C
> {
  protected _getDefaultMessage() {
    return DEFAULT_MESSAGE;
  }

  protected _validate(target: string | unknown[] | { [key: string]: unknown }): boolean {
    return size(target) >= this.config.minLength;
  }
}
export default MinLengthValidator;
