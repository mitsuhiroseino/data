import asArray from '@visue/utils/array/asArray';
import remove from '@visue/utils/array/remove';
import toId from '../../helpers/toId';
import toIds from '../../helpers/toIds';
import DataEntityBase from '../DataEntityBase';
import { EntityItem } from '../types';
import { TreeDataEntityConfig, TreeDataEntityEventHandlers } from './types';

/**
 * 子要素を持つエンティティ
 */
class TreeDataEntity<
  I extends EntityItem = EntityItem,
  H extends TreeDataEntityEventHandlers<I> = TreeDataEntityEventHandlers<I>,
  C extends TreeDataEntityConfig<I, H> = TreeDataEntityConfig<I, H>,
> extends DataEntityBase<I, H, C> {
  /**
   * 子要素
   */
  private _children?: TreeDataEntity[];

  constructor(config?: C) {
    super(config);
    const me = this,
      { children } = me.config;
    if (children) {
      this._children = asArray(children).map((child) =>
        child instanceof TreeDataEntity ? child : new TreeDataEntity({ item: child, valueRules: this._valueRules }),
      );
    }
  }

  /**
   * 子要素を追加する
   * @param children
   */
  add(children: TreeDataEntity | TreeDataEntity[]): void {
    const items = asArray(children);
    this._children = this._children || [];
    this._children.push(...items);
  }

  /**
   * 子要素を削除する
   * @param children
   */
  remove(children: TreeDataEntity | TreeDataEntity[] | string | string[]): void {
    if (this._children) {
      const ids = toIds(children);
      remove(this._children, (child) => ids.includes(toId(child)));
    }
  }
}
export default TreeDataEntity;
