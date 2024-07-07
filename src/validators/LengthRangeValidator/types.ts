import { MaxLengthValidatorConfig } from '../MaxLengthValidator';
import { MinLengthValidatorConfig } from '../MinLengthValidator';

/**
 * コンフィグ
 */
export type RangeValidatorConfig = MaxLengthValidatorConfig & MinLengthValidatorConfig;
