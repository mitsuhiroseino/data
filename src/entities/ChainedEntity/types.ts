import { DataEntityBaseConfig, DataEntityBaseEventHandlers } from '../DataEntityBase';
import { EntityItem } from '../types';

/**
 * イベントハンドラー
 */
export type ChainedEntityEventHandlers<I extends EntityItem = EntityItem> = DataEntityBaseEventHandlers<I>;

/**
 * コンフィグ
 */
export type ChainedEntityConfig<
  I extends EntityItem = EntityItem,
  H extends ChainedEntityEventHandlers<I> = ChainedEntityEventHandlers<I>,
> = DataEntityBaseConfig<I, H>;
