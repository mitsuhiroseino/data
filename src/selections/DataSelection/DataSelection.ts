import { Identifiable } from '@visue/utils';
import SelectionBase from '../SelectionBase';
import { DataSelectionConfig, DataSelectionEventHandlers } from './types';

/**
 * データ用の選択状態
 */
class DataSelection extends SelectionBase<Identifiable, DataSelectionEventHandlers, DataSelectionConfig> {}
export default DataSelection;
