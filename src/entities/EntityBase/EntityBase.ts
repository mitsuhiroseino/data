import EventedBase from '@visue/core/base/EventedBase';
import assignIdentifier from '@visue/utils/identifier/assignIdentifier';
import { Entity, EntityItem } from '../types';
import { EntityBaseEvents } from './constants';
import { EntityBaseConfig, EntityBaseEventHandlers } from './types';

/**
 * エンティティの抽象クラス
 */
abstract class EntityBase<
    I extends EntityItem = EntityItem,
    H extends EntityBaseEventHandlers = EntityBaseEventHandlers,
    C extends EntityBaseConfig<I, H> = EntityBaseConfig<I, H>,
  >
  extends EventedBase<H, C>
  implements Entity<I>
{
  readonly isEntity = true;

  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName?: string;

  /**
   * 要素
   */
  protected _item!: I;

  /**
   * 要素
   */
  get item(): I {
    return this._item;
  }

  constructor(config?: C) {
    super(config);
    const { item, idProperty, idNameProperty } = this.config;
    assignIdentifier(this, item, { idProperty, idNameProperty });
  }

  protected _setItem(item: I): void {
    this._item = item;
    this.fire(EntityBaseEvents.itemchange, { entity: this, item });
  }

  /**
   * 項目値を取得する
   * @param name 項目名
   * @returns
   */
  get<V = unknown>(name: string): V {
    return this._item[name];
  }

  set<V = unknown>(name: string, value: V, silent?: boolean): boolean {
    return false;
  }

  /**
   * 項目値の更新
   * @param updates 更新情報
   * @param silent trueの場合、updateイベントを発火しない
   */
  update(updates: Partial<I>, silent?: boolean): boolean {
    return false;
  }
}
export default EntityBase;
