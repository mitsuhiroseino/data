import { TypedPropertyConfig, TypedPropertyEventHandlers } from '../TypedProperty';

/**
 * イベントハンドラー
 */
export type MultiValuePropertyEventHandlers<V = any> = TypedPropertyEventHandlers<V>;

/**
 * コンフィグ
 */
export type MultiValuePropertyConfig<
  V = any,
  H extends MultiValuePropertyEventHandlers<V> = MultiValuePropertyEventHandlers<V>,
> = TypedPropertyConfig<V, H>;
