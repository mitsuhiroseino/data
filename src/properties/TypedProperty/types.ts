import { ValueType, ValueTypeConfig } from '../../valuetypes';
import { PropertyBaseConfig, PropertyBaseEventHandlers } from '../PropertyBase';

/**
 * イベントハンドラー
 */
export type TypedPropertyEventHandlers<V = any> = PropertyBaseEventHandlers<V>;

/**
 * コンフィグ
 */
export type TypedPropertyConfig<
  V = any,
  H extends TypedPropertyEventHandlers<V> = TypedPropertyEventHandlers<V>,
> = PropertyBaseConfig<V, H> & {
  /**
   * プロパティ名
   */
  name?: string;

  /**
   * データタイプ
   * valueRuleが設定されている場合は無効
   */
  valueType?: string | ValueType | ValueTypeConfig;
};
