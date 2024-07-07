import { CollectionBaseEvents } from '../CollectionBase';

/**
 * イベント
 */
export const DataCollectionBaseEvents = {
  ...CollectionBaseEvents,
  entitiesadd: 'entitiesadd',
  entitiesupdate: 'entitiesupdate',
  entitiesremove: 'entitiesremove',
  entitiesclear: 'entitiesclear',
} as const;
