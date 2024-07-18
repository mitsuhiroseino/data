import { EventedEvents } from '@visue/core/EventedBase';

/**
 * イベント
 */
export const PropertyBaseEvents = {
  ...EventedEvents,
  change: 'change',
} as const;
