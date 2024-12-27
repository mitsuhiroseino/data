import { EVENTED_EVENTS } from '@visue/core/EventedBase';

/**
 * イベント
 */
export const ENTITY_BASE_EVENTS = {
  ...EVENTED_EVENTS,
  itemchange: 'itemchange',
} as const;
