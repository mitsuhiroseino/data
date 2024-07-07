import EventedBase from '@visue/core/base/EventedBase';
import { Filter, FilterConfig, FilterFactory } from '@visue/datakit/filters';
import { Sorter, SorterConfig, SorterFactory } from '@visue/datakit/sorters';
import asArray from '@visue/utils/array/asArray';
import remove from '@visue/utils/array/remove';
import assignIdentifier from '@visue/utils/identifier/assignIdentifier';
import clone from 'lodash/clone';
import { Entity, EntityItem } from '../../entities';
import { Selection, SelectionFactory } from '../../selections';
import { Collection } from '../types';
import { CollectionBaseEvents } from './constants';
import { CollectionBaseConfig, CollectionBaseEventHandlers } from './types';

/**
 * ソーター、フィルターをもつリストの抽象クラス
 *
 * 用語の整理:
 *
 *   - source: フィルタやソートが適用されていない配列または配列の持ち主
 *   - data: フィルタやソートが適用された配列
 *   - item,items: 素のオブジェクトまたはオブジェクト配列
 *   - entity,entities: EntityインスタンスまたはEntityインスタンスの配列
 *
 */
abstract class CollectionBase<
    I extends EntityItem = EntityItem,
    S = any,
    H extends CollectionBaseEventHandlers<I> = CollectionBaseEventHandlers<I>,
    C extends CollectionBaseConfig<I, S, H> = CollectionBaseConfig<I, S, H>,
  >
  extends EventedBase<H, C>
  implements Collection<I, S, H>
{
  readonly isCollection = true;

  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName?: string;

  /**
   * 元データ
   */
  protected _source!: S;

  /**
   * 元エンティティ配列
   */
  protected _sourceEntities: Entity<I>[] = [];

  /**
   * ソートやフィルタリングが反映されたデータ
   */
  protected _entities: Entity<I>[] = [];

  /**
   * Entityのマップ
   */
  protected _entityMap: { [$id: string]: Entity<I> } = {};

  /**
   * フィルター
   */
  protected _filters: Filter[] = [];

  /**
   * ソーター
   */
  protected _sorters: Sorter[] = [];

  /**
   * 選択
   */
  protected _selection?: Selection;

  constructor(config?: C) {
    super(config);
    assignIdentifier(this, this.config);
    const me = this,
      { source, filters, sorters, selection } = me.config;
    if (filters) {
      me._addFilters_(filters);
    }
    if (sorters) {
      me._addSorters_(sorters);
    }
    if (selection) {
      me._selection = SelectionFactory.get(selection);
    }
    me._setSource_(source as S);
  }

  /**
   * ソースの差し替え(イベント発火、dataへの適用あり)
   * @param source
   */
  setSource(source: S): void {
    const me = this;
    me._setSource(source);
    me._setSourceEntities(me._toSourceEntities());
  }

  /**
   * ソースエンティティの差し替え(イベント発火、dataへの適用あり)
   * @param entities
   */
  protected _setSourceEntities(entities: Entity<I>[]) {
    this._sourceEntities = entities;
    this.fire(CollectionBaseEvents.sourcechange, { source: entities });
    // sourceが差し替えられたらdataも更新する
    this._applyEntities(entities);
  }

  /**
   * ソースの差し替え
   * @param source
   */
  protected _setSource_(source: S): void {
    const me = this;
    me._setSource(source as S);
    me._sourceEntities = me._toSourceEntities();
    me._applyEntities_();
  }

  /**
   * _sourceを設定する
   * @param source
   */
  protected abstract _setSource(source: S): void;

  /**
   * sourceを_sourceEntityに変換する
   * @param source
   */
  protected abstract _toSourceEntities(source?: S): Entity<I>[];

  getSourceItems(): I[] {
    return this._toItems(this.getSourceEntities());
  }

  getSourceEntities(): Entity<I>[] {
    return this._sourceEntities;
  }

  getSourceSize(): number {
    return this.getSourceEntities().length;
  }

  getItems(): I[] {
    return this._toItems(this._entities);
  }

  getEntities(): Entity<I>[] {
    return this._entities;
  }

  getSize(): number {
    return this._entities.length;
  }

  /**
   * entitiesをitemsに変換
   * @param entities
   * @returns
   */
  protected _toItems(entities: Entity<I> | Entity<I>[]): I[] {
    return asArray(entities).map((entity) => this._toItem(entity));
  }

  /**
   * entityをitemに変換
   * @param entity
   * @returns
   */
  protected _toItem(entity: Entity<I>): I {
    return entity.item;
  }

  /**
   * entitiesの差し替え(イベント発火あり)
   * @param entities
   */
  protected _setEntities(entities: Entity<I>[]) {
    const me = this;
    me._setEntities_(entities);
    me.fire(CollectionBaseEvents.datachange, { data: entities });
  }

  /**
   * entitiesの差し替え
   * @param item
   */
  protected _setEntities_(entities: Entity<I>[]) {
    const me = this;
    me._entities = entities;
    me._entityMap = {};
    for (const entity of me._entities) {
      me._entityMap[entity.$id] = entity;
    }
  }

  /**
   * フィルターの追加(イベント発火、dataへの適用あり)
   * @param target
   */
  addFilters(target: Filter | FilterConfig | (Filter | FilterConfig)[]): Filter[] {
    const me = this,
      filters = me._addFilters_(target);
    me._afterFilterChange();
    return filters;
  }

  /**
   * フィルターの追加
   * @param target
   */
  private _addFilters_(target: Filter | FilterConfig | (Filter | FilterConfig)[]): Filter[] {
    const me = this,
      filters = me._toFilters(target);
    // フィルターの追加
    me._filters.push(...filters);
    return filters;
  }

  protected _toFilters(target: Filter | FilterConfig | (Filter | FilterConfig)[]): Filter[] {
    return asArray(target).map(this._toFilter);
  }

  protected _toFilter(target: Filter | FilterConfig): Filter {
    return FilterFactory.get(target);
  }

  /**
   * フィルターの削除(イベント発火、dataへの適用あり)
   * @param target
   */
  removeFilters(target: string | string[]): void {
    const me = this;
    me._removeFilters_(target);
    me._afterFilterChange();
  }

  /**
   * フィルターの削除
   * @param target
   */
  private _removeFilters_(target: string | string[]): void {
    const me = this,
      ids = asArray(target);
    // フィルターの削除
    ids.forEach((id) => {
      remove(me._filters, { $id: id });
    });
  }

  /**
   * フィルターのクリア(イベント発火、dataへの適用あり)
   * @param target
   */
  clearFilter(): void {
    const me = this;
    me._clearFilter_();
    me._afterFilterChange();
  }

  /**
   * フィルターのクリア
   * @param target
   */
  private _clearFilter_(): void {
    const me = this;
    // 全フィルターの削除
    me._filters = [];
  }

  /**
   * フィルター変更時のイベント発火、dataへの適用
   */
  private _afterFilterChange() {
    this.fire(CollectionBaseEvents.filterchange, { filters: this._filters });
    // フィルターの適用
    this._applyEntities();
  }

  /**
   * フィルターを適用する
   */
  protected _applyFilter(entities: Entity<I>[] = this.getSourceEntities()): Entity<I>[] {
    const me = this,
      filters = me._filters;
    let filteredEntities;
    if (filters.length) {
      filteredEntities = entities.filter((entity) => me._filters.every((filter) => filter.match(entity.item)));
    } else {
      filteredEntities = clone(entities);
    }
    return filteredEntities;
  }

  /**
   * ソーターの追加(イベント発火、dataへの適用あり)
   * @param target
   */
  addSorters(target: Sorter | SorterConfig | (Sorter | SorterConfig)[]): Sorter[] {
    const me = this,
      sorters = me._addSorters_(target);
    me._afterSorterChange();
    return sorters;
  }

  /**
   * ソーターの追加
   * @param target
   */
  private _addSorters_(target: Sorter | SorterConfig | (Sorter | SorterConfig)[]): Sorter[] {
    const me = this,
      sorters = me._toSorters(target);
    // ソーターの追加
    me._sorters.push(...sorters);
    return sorters;
  }

  protected _toSorters(target: Sorter | SorterConfig | (Sorter | SorterConfig)[]): Sorter[] {
    return asArray(target).map(this._toSorter);
  }

  protected _toSorter(target: Sorter | SorterConfig): Sorter {
    return SorterFactory.get(target);
  }

  /**
   * ソーターの削除(イベント発火、dataへの適用あり)
   * @param target
   */
  removeSorters(target: string | string[]): void {
    const me = this;
    me._removeSorters_(target);
    me._afterSorterChange();
  }

  /**
   * ソーターの削除
   * @param target
   */
  private _removeSorters_(target: string | string[]): void {
    const me = this,
      ids = asArray(target);
    // ソーターの削除
    ids.forEach((id) => {
      remove(me._sorters, { $id: id });
    });
  }

  /**
   * ソート状態のクリア(イベント発火、dataへの適用あり)
   * @param target
   */
  clearSort(): void {
    const me = this;
    me._clearSort_();
    me._afterSorterChange();
  }

  /**
   * ソート状態のクリア
   * @param target
   */
  private _clearSort_(): void {
    const me = this;
    // 全ソーターの削除
    me._sorters = [];
  }

  /**
   * ソート状態変更時のイベント発火、dataへの適用
   */
  private _afterSorterChange() {
    this.fire(CollectionBaseEvents.sortchange, { sorters: this._sorters });
    // ソート状態の適用
    this._applyEntities();
  }

  /**
   * ソート状態を適用する
   */
  protected _applySort(entities: Entity<I>[] = this.getSourceEntities()): Entity<I>[] {
    const me = this,
      sorters = me._sorters,
      length = sorters.length;
    let sorteredEntities;
    if (length > 0) {
      sorteredEntities = clone(entities).sort((entity1, entity2) => {
        for (let i = length - 1; i > -1; i--) {
          const result = sorters[i].compare(entity1.item, entity2.item);
          if (result !== 0) {
            return result;
          }
        }
        return 0;
      });
    } else {
      sorteredEntities = clone(entities);
    }
    return sorteredEntities;
  }

  /**
   * フィルタ、ソートなどを適用しentitiesへ反映する(イベント発火あり)
   * @param entities
   */
  protected _applyEntities(entities: Entity<I>[] = this.getSourceEntities()) {
    const filteredEntities = this._applyFilter(entities);
    const sortedEntities = this._applySort(filteredEntities);
    this._setEntities(sortedEntities);
  }

  /**
   * フィルタ、ソートなどを適用しentitiesへ反映する
   * @param entities
   */
  protected _applyEntities_(entities: Entity<I>[] = this.getSourceEntities()) {
    const filteredEntities = this._applyFilter(entities);
    const sortedEntities = this._applySort(filteredEntities);
    this._setEntities_(sortedEntities);
  }

  get(id: string): Entity<I> | undefined {
    return this._entityMap[id];
  }

  select(condition: Filter | FilterConfig): Entity<I>[] {
    const filter = this._toFilter(condition);
    return this._entities.filter((entity) => filter.match(entity.item));
  }

  destructor(): void {
    const me = this;
    me._deleteProperties(['_source', '_sourceEntities', '_entities', '_idMap', '_filters', '_sorters', '_selection']);
    super.destructor();
  }
}
export default CollectionBase;
