import { EntityBaseConfig, EntityBaseEventHandlers } from '../EntityBase';
import { EntityItem } from '../types';

/**
 * イベントハンドラー
 */
export type NoopEntityEventHandlers = EntityBaseEventHandlers;

/**
 * コンフィグ
 */
export type NoopEntityConfig<
  I extends EntityItem = EntityItem,
  H extends NoopEntityEventHandlers = NoopEntityEventHandlers,
> = EntityBaseConfig<I, H>;
