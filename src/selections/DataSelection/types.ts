import { Identifiable } from '@visue/utils';
import { SelectionConfigBase, SelectionEventHandlersBase } from '../SelectionBase';

/**
 * イベントハンドラー
 */
export type DataSelectionEventHandlers = SelectionEventHandlersBase<Identifiable>;

/**
 * コンフィグ
 */
export type DataSelectionConfig = SelectionConfigBase<Identifiable, DataSelectionEventHandlers>;
