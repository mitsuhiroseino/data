import { DataEntityBaseConfig, DataEntityBaseEventHandlers } from '../DataEntityBase';
import { EntityItem } from '../types';
import TreeDataEntity from './TreeDataEntity';

/**
 * イベントハンドラー
 */
export type TreeDataEntityEventHandlers<I extends EntityItem = EntityItem> = DataEntityBaseEventHandlers<I>;

/**
 * コンフィグ
 */
export type TreeDataEntityConfig<
  I extends EntityItem = EntityItem,
  H extends TreeDataEntityEventHandlers<I> = TreeDataEntityEventHandlers<I>,
> = DataEntityBaseConfig<I, H> & {
  children?: TreeDataEntity[];
};
