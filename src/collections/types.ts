import { Destructible } from '@visue/core/DestructibleBase';
import { EventHandlers, Observable } from '@visue/core/events';
import { Filter, FilterConfig } from '@visue/datakit/filters';
import { Sorter, SorterConfig } from '@visue/datakit/sorters';
import { Identifiable, IdentifiableConfig } from '@visue/utils';
import { Entity, EntityItem } from '../entities';
import { Selection, SelectionConfig } from '../selections';
import { ValueRule, ValueRuleConfig } from '../valuerules';

/**
 * コレクションのコンフィグ
 */
export type CollectionConfig<I extends EntityItem = EntityItem, S = any> = IdentifiableConfig & {
  /**
   * データソース
   */
  source?: S;

  /**
   * フィルター
   */
  filters?: Filter | FilterConfig | (Filter | FilterConfig)[];

  /**
   * ソーター
   */
  sorters?: Sorter | SorterConfig | (Sorter | SorterConfig)[];

  /**
   * 選択
   */
  selection?: Selection<Entity<I>> | SelectionConfig;
};

/**
 * オブジェクト要素のコレクション
 */
export interface Collection<I extends EntityItem = EntityItem, S = any, H = EventHandlers>
  extends Observable<H>,
    Identifiable,
    Destructible {
  /**
   * Collectionのインスタンスであるか
   */
  readonly isCollection: true;

  /**
   * 元データの設定
   */
  setSource(source: S): void;

  /**
   * 元データの取得
   */
  getSourceItems(): I[];

  /**
   * 元レコード配列の取得
   */
  getSourceEntities(): Entity<I>[];

  /**
   * 元データの件数
   */
  getSourceSize(): number;

  /**
   * フィルター、ソートが適用されたデータの取得
   */
  getItems(): I[];

  /**
   * フィルター、ソートが適用されたレコード配列の取得
   */
  getEntities(): Entity<I>[];

  /**
   * フィルター、ソートが適用されたデータの件数
   */
  getSize(): number;

  /**
   * IDの一致する要素を1件取得
   * @param id ID
   */
  get(id: string): Entity<I> | undefined;

  /**
   * 条件に一致する要素を全て取得する
   * @param filter 条件
   */
  select(filter: Filter | FilterConfig): Entity<I>[];

  /**
   * フィルターの追加
   * @param filters フィルター
   */
  addFilters(filters: Filter | FilterConfig | (Filter | FilterConfig)[]): Filter[];

  /**
   * フィルターの削除
   * @param ids 削除対象のフィルターのID
   */
  removeFilters(ids: string | string[]): void;

  /**
   * フィルタリング状態の解除
   */
  clearFilter(): void;

  /**
   * ソーターの追加
   * @param sorters ソーター
   */
  addSorters(sorters: Sorter | SorterConfig | (Sorter | SorterConfig)[]): Sorter[];

  /**
   * ソーターの削除
   * @param ids 削除対象のソーターのID
   */
  removeSorters(ids: string | string[]): void;

  /**
   * ソート状態の解除
   */
  clearSort(): void;
}

/**
 * 編集可能なコレクションのコンフィグ
 */
export type EditableCollectionConfig<I extends EntityItem = EntityItem, S = any[]> = CollectionConfig<I, S> & {
  /**
   * 値規定
   */
  valueRules: (ValueRule | ValueRuleConfig)[];
};

/**
 * 編集可能なオブジェクト要素のコレクション
 */
export interface IEditableCollection<I extends EntityItem = EntityItem, S = any, H = EventHandlers>
  extends Collection<I, S, H> {
  /**
   * 要素の追加
   * @param items
   * @returns 追加した要素
   */
  add(items: I | I[]): Entity<I>[];

  /**
   * 要素の追加
   * @param items
   */
  update(items: I | I[]): Entity<I>[];

  /**
   * 要素の追加
   * @returns 削除した要素
   */
  remove(items: string | I | (string | I)[]): Entity<I>[];

  /**
   * 要素の追加
   * @returns 削除した要素
   */
  claer(): Entity<I>[];
}
