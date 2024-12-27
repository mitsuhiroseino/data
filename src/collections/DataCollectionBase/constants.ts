import { COLLECTION_BASE_EVENTS } from '../CollectionBase';

/**
 * イベント
 */
export const DATA_COLLECTION_BASE_EVENTS = {
  ...COLLECTION_BASE_EVENTS,
  entitiesadd: 'entitiesadd',
  entitiesupdate: 'entitiesupdate',
  entitiesremove: 'entitiesremove',
  entitiesclear: 'entitiesclear',
} as const;
