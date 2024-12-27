import { EventInfo } from '@visue/core/events';
import { Entity, EntityItem } from '../../entities';
import { CollectionBaseConfig, CollectionBaseEventHandlers } from '../CollectionBase';
import { EditableCollectionConfig } from '../types';
import { DATA_COLLECTION_BASE_EVENTS } from './constants';

/**
 * イベントハンドラー
 */
export type DataCollectionBaseEventHandlers<I extends EntityItem = EntityItem> = CollectionBaseEventHandlers<I> & {
  [DATA_COLLECTION_BASE_EVENTS.entitiesadd]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
  [DATA_COLLECTION_BASE_EVENTS.entitiesupdate]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
  [DATA_COLLECTION_BASE_EVENTS.entitiesremove]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
  [DATA_COLLECTION_BASE_EVENTS.entitiesclear]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
};

/**
 * コンフィグ
 */
export type DataCollectionBaseConfig<
  I extends EntityItem = EntityItem,
  S = any[],
  H extends DataCollectionBaseEventHandlers<I> = DataCollectionBaseEventHandlers<I>,
> = CollectionBaseConfig<I, S, H> & EditableCollectionConfig<I, S>;
