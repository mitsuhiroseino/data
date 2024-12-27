import { EVENTED_EVENTS } from '@visue/core/EventedBase';

/**
 * イベント
 */
export const PROPERTY_BASE_EVENTS = {
  ...EVENTED_EVENTS,
  change: 'change',
} as const;
