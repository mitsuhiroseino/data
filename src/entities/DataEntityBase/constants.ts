import { ENTITY_BASE_EVENTS } from '../EntityBase';

/**
 * イベント
 */
export const DATA_ENTITY_BASE_EVENTS = {
  ...ENTITY_BASE_EVENTS,
  update: 'update',
} as const;
