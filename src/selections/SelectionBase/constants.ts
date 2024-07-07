import { EventedEvents } from '@visue/core/base/EventedBase';

/**
 * イベント
 */
export const SelectionEventsBase = {
  ...EventedEvents,
  select: 'select',
  unselect: 'unselect',
} as const;
