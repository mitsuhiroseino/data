import { EntityItem } from '../../entities';
import { DataCollectionBaseConfig, DataCollectionBaseEventHandlers } from '../DataCollectionBase';

/**
 * イベントハンドラー
 */
export type DataCollectionEventHandlers<I extends EntityItem = EntityItem> = DataCollectionBaseEventHandlers<I>;

/**
 * コンフィグ
 */
export type DataCollectionConfig<
  I extends EntityItem = EntityItem,
  S = any[],
  H extends DataCollectionEventHandlers<I> = DataCollectionEventHandlers<I>,
> = DataCollectionBaseConfig<I, S, H>;
