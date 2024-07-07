import { EventedEvents } from '@visue/core/base/EventedBase';

/**
 * イベント
 */
export const EntityBaseEvents = {
  ...EventedEvents,
  itemchange: 'itemchange',
} as const;
