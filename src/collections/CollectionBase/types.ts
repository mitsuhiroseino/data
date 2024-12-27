import { EventedConfig, EventedEventHandlers } from '@visue/core/EventedBase';
import { EventInfo, FireParams } from '@visue/core/events';
import { Filter } from '@visue/datakit/filters';
import { Sorter } from '@visue/datakit/sorters';
import { Entity, EntityItem } from '../../entities';
import { CollectionConfig } from '../types';
import { COLLECTION_BASE_EVENTS } from './constants';

export type CollectionEventInfo<P = FireParams> = EventInfo<P>;

/**
 * イベントハンドラー
 */
export type CollectionBaseEventHandlers<I extends EntityItem = EntityItem> = EventedEventHandlers & {
  [COLLECTION_BASE_EVENTS.sourcechange]?: (event: CollectionEventInfo) => void;
  [COLLECTION_BASE_EVENTS.datachange]?: (event: EventInfo<{ data: Entity<I>[] }>) => void;
  [COLLECTION_BASE_EVENTS.filterchange]?: (event: EventInfo<{ filters: Filter[] }>) => void;
  [COLLECTION_BASE_EVENTS.sortchange]?: (event: EventInfo<{ sorters: Sorter[] }>) => void;
};

/**
 * コンフィグ
 */
export type CollectionBaseConfig<
  I extends EntityItem = EntityItem,
  S = any,
  H extends EventedEventHandlers = EventedEventHandlers,
> = EventedConfig<H> & CollectionConfig<I, S>;
