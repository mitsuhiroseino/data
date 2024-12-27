import { EVENTED_EVENTS } from '@visue/core/EventedBase';
import { ENTITY_BASE_EVENTS } from '../../entities/EntityBase';

/**
 * イベント
 */
export const COLLECTION_BASE_EVENTS = {
  ...EVENTED_EVENTS,
  ...ENTITY_BASE_EVENTS,
  sourcechange: 'sourcechange',
  datachange: 'datachange',
  filterchange: 'filterchange',
  sortchange: 'sorterchange',
} as const;
