import { i18nResources } from '@visue/i18n';
import BigNumber from 'bignumber.js';
import ValidatorBase from '../ValidatorBase';
import { MaxValidatorConfig } from './types';

const DEFAULT_MESSAGE = 'message-validator-max-error';
i18nResources.updateDefault({
  [DEFAULT_MESSAGE]: '{max}以下を入力してください。',
});

/**
 * 値が指定の数以下か
 */
class MaxValidator<C extends MaxValidatorConfig = MaxValidatorConfig> extends ValidatorBase<
  number | string | BigNumber,
  C
> {
  protected _max: BigNumber;

  constructor(config: C) {
    super(config);
    this._max = new BigNumber(this.config.max);
  }

  protected _getDefaultMessage() {
    return DEFAULT_MESSAGE;
  }

  protected _validate(target: number | string | BigNumber): boolean {
    // max >= target
    return this._max.gte(target);
  }
}
export default MaxValidator;
