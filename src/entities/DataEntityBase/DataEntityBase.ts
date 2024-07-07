import toMap from '@visue/utils/array/toMap';
import { ValueRule, ValueRuleFactory } from '../../valuerules';
import EntityBase from '../EntityBase';
import { EntityItem } from '../types';
import { DataEntityBaseEvents } from './constants';
import { DataEntityBaseConfig, DataEntityBaseEventHandlers } from './types';

/**
 * エンティティの抽象クラス
 */
abstract class DataEntityBase<
  I extends EntityItem = EntityItem,
  H extends DataEntityBaseEventHandlers<I> = DataEntityBaseEventHandlers<I>,
  C extends DataEntityBaseConfig<I, H> = DataEntityBaseConfig<I, H>,
> extends EntityBase<I, H, C> {
  /**
   * 値規定
   */
  protected _valueRules!: ValueRule[];

  /**
   * 値規定のマップ
   */
  protected _valueRuleMap!: { [name: string]: ValueRule };

  constructor(config?: C) {
    super(config);
    const me = this,
      { item: orgItem, valueRules: valueRules } = me.config;
    me._valueRules = ValueRuleFactory.from(valueRules);
    me._valueRuleMap = toMap(me._valueRules, 'name');
    const item = { ...orgItem };
    item.$id = me.$id;
    me._item = item as I;
    for (const valueRules of me._valueRules) {
      this._set(valueRules.name, item[valueRules.name]);
    }
  }

  set<V = unknown>(name: string, value: V, silent?: boolean): boolean {
    const oldValue = this._item[name],
      changed = value !== oldValue;
    if (changed) {
      this._set(name, value);
      if (!silent) {
        this.fire(DataEntityBaseEvents.update, { entity: this, updates: { [name]: value } });
      }
    }
    return changed;
  }

  /**
   * itemに値を設定する
   * @param name
   * @param value
   */
  protected _set<V = unknown>(name: string, value: V): void {
    const valueRule = this._valueRuleMap[name];
    let val;
    if (valueRule) {
      val = valueRule.parse(value);
    } else {
      val = value;
    }
    this._setValue(name, val);
  }

  protected _setValue<V = unknown>(name: string, value: V): void {
    (this._item as EntityItem)[name] = value;
  }

  /**
   * 項目値の更新
   * @param updates 更新情報
   * @param silent trueの場合、updateイベントを発火しない
   */
  update(updates: Partial<I>, silent?: boolean): boolean {
    const { $id, ...rest } = updates;
    let changed = false;
    for (const name in rest) {
      const result = this.set(name, rest[name], true);
      if (result) {
        changed = true;
      }
    }
    if (changed && !silent) {
      this.fire(DataEntityBaseEvents.update, { entity: this, updates });
    }
    return changed;
  }
}
export default DataEntityBase;
