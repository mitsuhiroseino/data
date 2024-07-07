import { EventedConfig, EventedEventHandlers } from '@visue/core/base/EventedBase';
import { EventInfo, FireParams } from '@visue/core/events';
import { Filter } from '@visue/datakit/filters';
import { Sorter } from '@visue/datakit/sorters';
import { Entity, EntityItem } from '../../entities';
import { CollectionConfig } from '../types';
import { CollectionBaseEvents } from './constants';

export type CollectionEventInfo<P = FireParams> = EventInfo<P>;

/**
 * イベントハンドラー
 */
export type CollectionBaseEventHandlers<I extends EntityItem = EntityItem> = EventedEventHandlers & {
  [CollectionBaseEvents.sourcechange]?: (event: CollectionEventInfo) => void;
  [CollectionBaseEvents.datachange]?: (event: EventInfo<{ data: Entity<I>[] }>) => void;
  [CollectionBaseEvents.filterchange]?: (event: EventInfo<{ filters: Filter[] }>) => void;
  [CollectionBaseEvents.sortchange]?: (event: EventInfo<{ sorters: Sorter[] }>) => void;
};

/**
 * コンフィグ
 */
export type CollectionBaseConfig<
  I extends EntityItem = EntityItem,
  S = any,
  H extends EventedEventHandlers = EventedEventHandlers,
> = EventedConfig<H> & CollectionConfig<I, S>;
