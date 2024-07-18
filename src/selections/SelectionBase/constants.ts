import { EventedEvents } from '@visue/core/EventedBase';

/**
 * イベント
 */
export const SelectionEventsBase = {
  ...EventedEvents,
  select: 'select',
  unselect: 'unselect',
} as const;
