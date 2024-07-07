import DataEntityBase from '../DataEntityBase';
import { EntityItem } from '../types';
import { DataEntityConfig, DataEntityEventHandlers } from './types';

/**
 * データコレクションのエンティティ
 */
class DataEntity<
  I extends EntityItem = EntityItem,
  H extends DataEntityEventHandlers<I> = DataEntityEventHandlers<I>,
  C extends DataEntityConfig<I, H> = DataEntityConfig<I, H>,
> extends DataEntityBase<I, H, C> {}
export default DataEntity;
