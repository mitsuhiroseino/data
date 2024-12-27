import { EventedConfig, EventedEventHandlers } from '@visue/core/EventedBase';
import { EventInfo } from '@visue/core/events';
import { EntityConfig, EntityItem } from '../types';
import { ENTITY_BASE_EVENTS } from './constants';

/**
 * イベントハンドラー
 */
export type EntityBaseEventHandlers = EventedEventHandlers & {
  [ENTITY_BASE_EVENTS.itemchange]: (event: EventInfo) => void;
};

/**
 * コンフィグ
 */
export type EntityBaseConfig<
  I extends EntityItem = EntityItem,
  H extends EntityBaseEventHandlers = EntityBaseEventHandlers,
> = EventedConfig<H> & EntityConfig<I>;
