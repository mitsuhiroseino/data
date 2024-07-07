import { ValueType, ValueTypeConfig } from '../../valuetypes';
import { ValueRuleBaseConfig } from '../ValueRuleBase';

/**
 * コンフィグ
 */
export type TypedValueRuleConfig = ValueRuleBaseConfig & {
  /**
   * 値型
   */
  valueType: string | ValueType | ValueTypeConfig;
};
