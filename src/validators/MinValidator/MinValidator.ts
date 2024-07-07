import { i18nResources } from '@visue/i18n';
import BigNumber from 'bignumber.js';
import ValidatorBase from '../ValidatorBase';
import { MinValidatorConfig } from './types';

const DEFAULT_MESSAGE = 'message-validator-min-error';
i18nResources.updateDefault({
  [DEFAULT_MESSAGE]: '{min}以上を入力してください。',
});

/**
 * 値が指定の数以上か
 */
class MinValidator<C extends MinValidatorConfig = MinValidatorConfig> extends ValidatorBase<
  number | string | BigNumber,
  C
> {
  protected _min: BigNumber;

  constructor(config: C) {
    super(config);
    this._min = new BigNumber(this.config.min);
  }

  protected _getDefaultMessage() {
    return DEFAULT_MESSAGE;
  }

  protected _validate(target: number | string | BigNumber): boolean {
    // min <= target
    return this._min.lte(target);
  }
}
export default MinValidator;
