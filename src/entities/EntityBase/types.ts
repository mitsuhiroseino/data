import { EventedConfig, EventedEventHandlers } from '@visue/core/base/EventedBase';
import { EventInfo } from '@visue/core/events';
import { EntityConfig, EntityItem } from '../types';
import { EntityBaseEvents } from './constants';

/**
 * イベントハンドラー
 */
export type EntityBaseEventHandlers = EventedEventHandlers & {
  [EntityBaseEvents.itemchange]: (event: EventInfo) => void;
};

/**
 * コンフィグ
 */
export type EntityBaseConfig<
  I extends EntityItem = EntityItem,
  H extends EntityBaseEventHandlers = EntityBaseEventHandlers,
> = EventedConfig<H> & EntityConfig<I>;
