import EasyFactory from '@visue/factory/easy/EasyFactory';
import DataSelection from './DataSelection';
import SELECTION_TYPES from './SELECTION_TYPES';
import { Selection } from './types';

const SelectionFactory = new EasyFactory<Selection>({
  category: 'selection',
  products: [{ type: SELECTION_TYPES.DATA, Class: DataSelection }],
});
export default SelectionFactory;
