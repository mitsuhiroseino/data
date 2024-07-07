import asArray from '@visue/utils/array/asArray';
import TypedValueRule from '../TypedValueRule';
import { MultiValueRuleConfig } from './types';

/**
 * 配列形式の値のルール
 */
class MultiValueRule<
  V = any[],
  F = string[],
  C extends MultiValueRuleConfig = MultiValueRuleConfig,
> extends TypedValueRule<V, F, C> {
  constructor(config: C) {
    super(config);
  }

  protected _validate(target: V): string | null {
    const targets = asArray(target);
    for (const value of targets) {
      const errorMessage = super._validate(value);
      if (errorMessage != null) {
        // エラーの場合はエラーメッセージを返す
        return errorMessage;
      }
    }
    return null;
  }

  protected _parse(target: any): V {
    const targets = asArray(target);
    // 配列の要素に対してparseを実行
    return targets.map((value) => super._parse(value)) as V;
  }

  protected _serialize(value: V): any {
    const values = asArray(value);
    // 配列の要素に対して_serializeを実行
    return values.map((value) => super._serialize(value));
  }

  protected _format(value: V): F {
    const values = asArray(value);
    // 配列の要素に対して_formatを実行
    return values.map((value) => super._format(value)) as F;
  }
}
export default MultiValueRule;
