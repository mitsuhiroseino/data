import { EventInfo } from '@visue/core/events';
import { EntityBaseConfig, EntityBaseEventHandlers } from '../EntityBase';
import { EntityItem } from '../types';
import DataEntityBase from './DataEntityBase';
import { DataEntityBaseEvents } from './constants';

/**
 * イベントハンドラー
 */
export type DataEntityBaseEventHandlers<I extends EntityItem = EntityItem> = EntityBaseEventHandlers & {
  [DataEntityBaseEvents.update]?: (event: EventInfo<{ entity: DataEntityBase<I>; updates: Partial<I> }>) => void;
};

/**
 * コンフィグ
 */
export type DataEntityBaseConfig<
  I extends EntityItem = EntityItem,
  H extends DataEntityBaseEventHandlers<I> = DataEntityBaseEventHandlers<I>,
> = EntityBaseConfig<I, H>;
