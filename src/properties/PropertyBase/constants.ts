import { EventedEvents } from '@visue/core/base/EventedBase';

/**
 * イベント
 */
export const PropertyBaseEvents = {
  ...EventedEvents,
  change: 'change',
} as const;
