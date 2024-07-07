import { MaxValidatorConfig } from '../MaxValidator';
import { MinValidatorConfig } from '../MinValidator';

/**
 * コンフィグ
 */
export type RangeValidatorConfig = MaxValidatorConfig & MinValidatorConfig;
