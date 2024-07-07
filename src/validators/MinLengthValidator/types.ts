import { ValidatorBaseConfig } from '../ValidatorBase';

/**
 * コンフィグ
 */
export type MinLengthValidatorConfig = ValidatorBaseConfig & {
  /**
   * 最小長
   */
  minLength: number;
};
