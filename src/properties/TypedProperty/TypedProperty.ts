import uuid from '@visue/utils/data/uuid';
import { TypedValueRuleConfig } from '../../valuerules/TypedValueRule';
import PropertyBase from '../PropertyBase';
import { TypedPropertyConfig, TypedPropertyEventHandlers } from './types';

/**
 * データ種別を持つプロパティ
 */
class TypedProperty<
  V = any,
  H extends TypedPropertyEventHandlers<V> = TypedPropertyEventHandlers<V>,
  C extends TypedPropertyConfig<V, H> = TypedPropertyConfig<V, H>,
> extends PropertyBase<V, H, C> {
  /**
   * 種別
   */
  static TYPE = 'typed';

  constructor(config: C) {
    super(config);
  }

  protected _getValueRuleConfig(): string | TypedValueRuleConfig {
    const { name, valueType } = this.config;
    if (valueType) {
      return { name: name || uuid(), type: 'typed', valueType: valueType };
    } else {
      return 'noop';
    }
  }
}
export default TypedProperty;
