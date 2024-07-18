import EventedBase from '@visue/core/EventedBase';
import assignIdentifier from '@visue/utils/identifier/assignIdentifier';
import { ValueRule, ValueRuleConfig, ValueRuleFactory } from '../../valuerules';
import { Property, ValidateValueOptions } from '../types';
import { PropertyBaseEvents } from './constants';
import { PropertyBaseConfig, PropertyBaseEventHandlers } from './types';

/**
 * プロパティの基底クラス
 */
abstract class PropertyBase<
    V = any,
    H extends PropertyBaseEventHandlers<V> = PropertyBaseEventHandlers<V>,
    C extends PropertyBaseConfig<V, H> = PropertyBaseConfig<V, H>,
  >
  extends EventedBase<H, C>
  implements Property<V, H>
{
  readonly isProperty = true;

  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName?: string;

  /**
   * プロパティ名
   */
  get name(): string {
    return this._valueRule.name;
  }

  /**
   * 値規定
   */
  protected _valueRule!: ValueRule;

  /**
   * 値
   */
  protected _value!: V;

  constructor(config?: C) {
    super(config);
    assignIdentifier(this, this.config);
    const cfg = this.config;
    const { valueRule, value } = cfg;
    this._valueRule = ValueRuleFactory.get(valueRule || this._getValueRuleConfig());
    this._set(value);
  }

  protected abstract _getValueRuleConfig(): string | ValueRuleConfig;

  /**
   * 値を取得する
   * @returns 値
   */
  get(): V {
    return this._value;
  }

  /**
   * 値を設定する
   * @param value 値
   * @param silent trueの場合、updateイベントを発火しない
   * @returns 値が変更された場合にtrue
   */
  set(value: V, silent?: boolean): boolean {
    const oldValue = this._value,
      changed = this._isChanged(value, oldValue);
    if (changed) {
      this._set(value);
      if (!silent) {
        this.fire(PropertyBaseEvents.change, { value });
      }
    }
    return changed;
  }

  protected _isChanged(value: V, oldValue: V): boolean {
    return value === oldValue;
  }

  /**
   * 値を設定する
   * @param name
   * @param value
   */
  protected _set(value: V): void {
    this._value = this._valueRule.parse(value);
  }

  validate(options?: ValidateValueOptions): string | null {
    return this._validate(this._value, options);
  }

  protected _validate(value: any, options?: ValidateValueOptions): string | null {
    return this._valueRule.validate(value, options);
  }

  serialize() {
    return this._serialize(this._value);
  }

  protected _serialize(value: V) {
    return this._valueRule.serialize(value);
  }

  format(): any {
    return this._format(this._value);
  }

  protected _format(value: V): any {
    return this._valueRule.format(value);
  }

  destructor(): void {
    this._valueRule.destructor();
    this._deleteProperties(['_valueRule', '_value']);
    super.destructor();
  }
}
export default PropertyBase;
