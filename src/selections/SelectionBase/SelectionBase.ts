import EventedBase from '@visue/core/EventedBase';
import { Identifiable } from '@visue/utils';
import asArray from '@visue/utils/array/asArray';
import assignIdentifier from '@visue/utils/identifier/assignIdentifier';
import remove from 'lodash/remove';
import toId from '../../helpers/toId';
import toIds from '../../helpers/toIds';
import { Selection } from '../types';
import { SELECTION_EVENTS_BASE } from './constants';
import { SelectionConfigBase, SelectionEventHandlersBase } from './types';

/**
 * 選択状態の抽象クラス
 */
abstract class SelectionBase<
    I extends Identifiable = Identifiable,
    H extends SelectionEventHandlersBase<I> = SelectionEventHandlersBase<I>,
    C extends SelectionConfigBase<I, H> = SelectionConfigBase<I, H>,
  >
  extends EventedBase<H, C>
  implements Selection<I, H>
{
  readonly isSelection = true;

  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName?: string;

  /**
   * 選択された要素(順序あり)
   */
  private _selections: I[] = [];

  /**
   * 選択された要素($idでアクセス可)
   */
  private _selectionMap: { [$id: string]: I } = {};

  constructor(config?: C) {
    super(config);
    assignIdentifier(this, this.config);
  }

  select(target: I | I[]): void {
    const me = this,
      selected: I[] = [];
    let items = asArray(target);
    if (!me.config.multi) {
      // 複数選択ではない場合
      // 選択済みのものを削除
      me.clear();
      if (items.length) {
        // 選択されている中の最初の1件のみが有効
        items = [items[0]];
      }
    }
    for (const item of items) {
      if (item.$id in me._selectionMap === false) {
        me._selections.push(item);
        me._selectionMap[item.$id] = item;
        selected.push(item);
      }
    }
    me.fire(SELECTION_EVENTS_BASE.select, { items: selected });
  }

  unselect(target: string | I | (string | I)[]): I[] {
    const me = this,
      ids = toIds(target),
      unselected = ids.reduce((result, id) => {
        const removed = me._unselect(id);
        if (removed) {
          result.push(removed);
        }
        return result;
      }, [] as I[]);
    me.fire(SELECTION_EVENTS_BASE.unselect, { items: unselected });
    return unselected;
  }

  protected _unselect(id: string): I {
    const me = this,
      removed = me._selectionMap[id];
    if (removed) {
      delete me._selectionMap[id];
      remove(me._selections, (selection) => selection === removed);
    }
    return removed;
  }

  clear(): I[] {
    const me = this,
      unselected = me._selections;
    me._selections = [];
    me._selectionMap = {};
    me.fire(SELECTION_EVENTS_BASE.unselect, { items: unselected });
    return unselected;
  }

  has(target: string | I): boolean {
    const id = toId(target);
    return id in this._selectionMap;
  }

  destructor(): void {
    const me = this;
    me._deleteProperties(['_selections', '_selectionMap']);
    super.destructor();
  }
}
export default SelectionBase;
