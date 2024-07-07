import TypedValueRule from '../TypedValueRule';
import { AnyValueRuleConfig } from './types';

/**
 * 任意の値のルール
 */
class AnyValueRule<V = any, C extends AnyValueRuleConfig = AnyValueRuleConfig> extends TypedValueRule<V, C> {
  constructor(config: C) {
    super({ ...config, valueType: 'any' });
  }
}
export default AnyValueRule;
