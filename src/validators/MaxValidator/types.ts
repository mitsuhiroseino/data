import BigNumber from 'bignumber.js';
import { ValidatorBaseConfig } from '../ValidatorBase';

/**
 * コンフィグ
 */
export type MaxValidatorConfig = ValidatorBaseConfig & {
  /**
   * 最大値
   */
  max: number | string | BigNumber;
};
