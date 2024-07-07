import isPlainObject from 'lodash/isPlainObject';

import asArray from '@visue/utils/array/asArray';
import { TypedValueRuleConfig } from '../../valuerules/TypedValueRule';
import TypedProperty from '../TypedProperty';
import { ValidateValueOptions } from '../types';
import { MultiValuePropertyConfig, MultiValuePropertyEventHandlers } from './types';

/**
 * 配列で値を持つプロパティ
 */
class MultiValueProperty<
  V = any[],
  H extends MultiValuePropertyEventHandlers<V> = MultiValuePropertyEventHandlers<V>,
  C extends MultiValuePropertyConfig<V, H> = MultiValuePropertyConfig<V, H>,
> extends TypedProperty<V, H, C> {
  /**
   * 種別
   */
  static TYPE = 'multivalue';

  constructor(config: C) {
    super(config);
  }

  protected _getValueRuleConfig(): string | TypedValueRuleConfig {
    const valueRuleConfig = super._getValueRuleConfig();
    if (isPlainObject(valueRuleConfig)) {
      (valueRuleConfig as any).type = 'multivalue';
    }
    return valueRuleConfig;
  }

  protected _set(target: unknown): void {
    const targets = asArray(target);
    // 配列の要素に対してparseを実行
    this._value = targets.map((value) => this._valueRule.parse(value)) as V;
  }

  protected _validate(target: V, options?: ValidateValueOptions): string | null {
    const targets = asArray(target);
    for (const value of targets) {
      const errorMessage = this._valueRule.validate(value, options);
      if (errorMessage != null) {
        // エラーの場合はエラーメッセージを返す
        return errorMessage;
      }
    }
    return null;
  }

  protected _serialize(value: V) {
    const values = asArray(value);
    // 配列の要素に対してserializeを実行
    return values.map((value) => super._serialize(value));
  }

  protected _format(value: V): any {
    const values = asArray(value);
    // 配列の要素に対してformatを実行
    return values.map((value) => super._format(value));
  }
}
export default MultiValueProperty;
