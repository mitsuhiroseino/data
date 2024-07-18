import { EventedEvents } from '@visue/core/EventedBase';

/**
 * イベント
 */
export const EntityBaseEvents = {
  ...EventedEvents,
  itemchange: 'itemchange',
} as const;
