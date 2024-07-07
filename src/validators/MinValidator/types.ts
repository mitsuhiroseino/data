import BigNumber from 'bignumber.js';
import { ValidatorBaseConfig } from '../ValidatorBase';

/**
 * コンフィグ
 */
export type MinValidatorConfig = ValidatorBaseConfig & {
  /**
   * 最小値
   */
  min: number | string | BigNumber;
};
