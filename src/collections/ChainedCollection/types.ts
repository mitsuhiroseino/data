import { EntityItem } from '../../entities';
import { CollectionBaseConfig, CollectionBaseEventHandlers } from '../CollectionBase';

/**
 * イベントハンドラー
 */
export type ChainedCollectionEventHandlers<I extends EntityItem = EntityItem> = CollectionBaseEventHandlers<I>;

/**
 * コンフィグ
 */
export type ChainedCollectionConfig<
  I extends EntityItem = EntityItem,
  S = any[],
  H extends ChainedCollectionEventHandlers<I> = ChainedCollectionEventHandlers<I>,
> = CollectionBaseConfig<I, S, H>;
