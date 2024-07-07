import { ValidatorBaseConfig } from '../ValidatorBase';

/**
 * コンフィグ
 */
export type MaxLengthValidatorConfig = ValidatorBaseConfig & {
  /**
   * 最大長
   */
  maxLength: number;
};
