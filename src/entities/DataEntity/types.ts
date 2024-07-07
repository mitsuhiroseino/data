import { DataEntityBaseConfig, DataEntityBaseEventHandlers } from '../DataEntityBase';
import { EntityItem } from '../types';

/**
 * イベントハンドラー
 */
export type DataEntityEventHandlers<I extends EntityItem = EntityItem> = DataEntityBaseEventHandlers<I>;

/**
 * コンフィグ
 */
export type DataEntityConfig<
  I extends EntityItem = EntityItem,
  H extends DataEntityEventHandlers<I> = DataEntityEventHandlers<I>,
> = DataEntityBaseConfig<I, H>;
