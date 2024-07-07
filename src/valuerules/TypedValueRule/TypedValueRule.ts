import { ValueType, ValueTypeFactory } from '../../valuetypes';
import ValueRuleBase from '../ValueRuleBase';
import { TypedValueRuleConfig } from './types';

/**
 * データ種別を持つ値のルール
 */
class TypedValueRule<V = any, F = string, C extends TypedValueRuleConfig = TypedValueRuleConfig> extends ValueRuleBase<
  V,
  F,
  C
> {
  /**
   * 値型
   */
  private _valueType: ValueType;

  constructor(config: C) {
    super(config);
    this._valueType = ValueTypeFactory.get(this.config.valueType || 'string');
  }

  protected _parse(target: any): V {
    return this._valueType.parse(target);
  }

  protected _serialize(value: V): any {
    return this._valueType.serialize(value);
  }

  protected _format(value: V): F {
    return this._valueType.format(value) as F;
  }

  destructor(): void {
    this._deleteProperties(['_valueType']);
    super.destructor();
  }
}
export default TypedValueRule;
