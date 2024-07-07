import { EntityItem } from '../../entities';
import { CollectionBaseConfig, CollectionBaseEventHandlers } from '../CollectionBase';

/**
 * イベントハンドラー
 */
export type NoopCollectionEventHandlers<I extends EntityItem = EntityItem> = CollectionBaseEventHandlers<I>;

/**
 * コンフィグ
 */
export type NoopCollectionConfig<
  I extends EntityItem = EntityItem,
  S = any[],
  H extends NoopCollectionEventHandlers<I> = NoopCollectionEventHandlers<I>,
> = CollectionBaseConfig<I, S, H>;
