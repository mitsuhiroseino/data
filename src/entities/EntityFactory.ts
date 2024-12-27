import EasyFactory from '@visue/factory/easy/EasyFactory';
import ChainedEntity from './ChainedEntity';
import DataEntity from './DataEntity';
import ENTITY_TYPES from './ENTITY_TYPES';
import NoopEntity from './NoopEntity';
import TreeDataEntity from './TreeDataEntity';
import { Entity } from './types';

const EntityFactory = new EasyFactory<Entity>({
  category: 'entity',
  products: [
    { type: ENTITY_TYPES.NOOP, Class: NoopEntity },
    { type: ENTITY_TYPES.DATA, Class: DataEntity },
    { type: ENTITY_TYPES.CHAINED, Class: ChainedEntity },
    { type: ENTITY_TYPES.TREEDATA, Class: TreeDataEntity },
  ],
});
export default EntityFactory;
