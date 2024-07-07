import { i18nResources } from '@visue/i18n';
import isEmptyValue from '@visue/utils/lang/isEmptyValue';
import ValidatorBase from '../ValidatorBase';
import { RequiredValidatorConfig } from './types';

const DEFAULT_MESSAGE = 'message-validator-required-error';
i18nResources.updateDefault({
  [DEFAULT_MESSAGE]: '入力してください。',
});

/**
 * 値が入力されているか
 */
class RequiredValidator<C extends RequiredValidatorConfig = RequiredValidatorConfig> extends ValidatorBase<unknown, C> {
  protected _getDefaultMessage() {
    return DEFAULT_MESSAGE;
  }

  protected _validate(target: unknown): boolean {
    return !isEmptyValue(target);
  }
}
export default RequiredValidator;
