import BigNumber from 'bignumber.js';

import { i18nResources } from '@visue/i18n';
import ValidatorBase from '../ValidatorBase';
import { RangeValidatorConfig } from './types';

const DEFAULT_MESSAGE = 'message-validator-range-error';
i18nResources.updateDefault({
  [DEFAULT_MESSAGE]: '{min}以上、{max}以下を入力してください。',
});

/**
 * 値が指定の範囲内か
 */
class RangeValidator<C extends RangeValidatorConfig = RangeValidatorConfig> extends ValidatorBase<
  number | string | BigNumber,
  C
> {
  protected _min: BigNumber;

  protected _max: BigNumber;

  constructor(config: C) {
    super(config);
    this._min = new BigNumber(this.config.min);
    this._max = new BigNumber(this.config.max);
  }

  protected _getDefaultMessage() {
    return DEFAULT_MESSAGE;
  }

  protected _validate(target: number | string | BigNumber): boolean {
    // min <= target && max >= target
    return this._min.lte(target) && this._max.gte(target);
  }
}
export default RangeValidator;
