import { EntityBaseEvents } from '../EntityBase';

/**
 * イベント
 */
export const DataEntityBaseEvents = {
  ...EntityBaseEvents,
  update: 'update',
} as const;
