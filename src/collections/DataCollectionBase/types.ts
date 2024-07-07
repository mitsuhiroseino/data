import { EventInfo } from '@visue/core/events';
import { Entity, EntityItem } from '../../entities';
import { CollectionBaseConfig, CollectionBaseEventHandlers } from '../CollectionBase';
import { EditableCollectionConfig } from '../types';
import { DataCollectionBaseEvents } from './constants';

/**
 * イベントハンドラー
 */
export type DataCollectionBaseEventHandlers<I extends EntityItem = EntityItem> = CollectionBaseEventHandlers<I> & {
  [DataCollectionBaseEvents.entitiesadd]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
  [DataCollectionBaseEvents.entitiesupdate]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
  [DataCollectionBaseEvents.entitiesremove]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
  [DataCollectionBaseEvents.entitiesclear]?: (event: EventInfo<{ entities: Entity<I>[] }>) => void;
};

/**
 * コンフィグ
 */
export type DataCollectionBaseConfig<
  I extends EntityItem = EntityItem,
  S = any[],
  H extends DataCollectionBaseEventHandlers<I> = DataCollectionBaseEventHandlers<I>,
> = CollectionBaseConfig<I, S, H> & EditableCollectionConfig<I, S>;
