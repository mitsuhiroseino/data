import { EVENTED_EVENTS } from '@visue/core/EventedBase';

/**
 * イベント
 */
export const SELECTION_EVENTS_BASE = {
  ...EVENTED_EVENTS,
  select: 'select',
  unselect: 'unselect',
} as const;
