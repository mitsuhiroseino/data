import EasyFactory from '@visue/factory/easy/EasyFactory';
import ChainedCollection from './ChainedCollection';
import COLLECTION_TYPES from './COLLECTION_TYPES';
import DataCollection from './DataCollection';
import NoopCollection from './NoopCollection';
import { Collection } from './types';

const CollectionFactory = new EasyFactory<Collection>({
  category: 'collection',
  products: [
    { type: COLLECTION_TYPES.NOOP, Class: NoopCollection },
    { type: COLLECTION_TYPES.DATA, Class: DataCollection },
    { type: COLLECTION_TYPES.CHAINED, Class: ChainedCollection },
  ],
});
export default CollectionFactory;
