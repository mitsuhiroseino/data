import { Evented } from '@visue/core/base/EventedBase';
import { Identifiable, IdentifiableConfig } from '@visue/utils';
import { ValueRule, ValueRuleConfig } from '../valuerules';

/**
 * Entityに設定可能な要素
 */
export type EntityItem = Partial<Identifiable> & Record<string, any>;

/**
 * コンフィグ
 */
export type EntityConfig<I extends EntityItem = EntityItem> = IdentifiableConfig & {
  /**
   * 対象の要素
   */
  item: I;

  /**
   * 値規定
   */
  valueRules: (ValueRule | ValueRuleConfig)[];

  /**
   * IDとして扱うitemのプロパティ
   * デフォルトは$id
   */
  idProperty?: string;

  /**
   * 識別名として扱うitemのプロパティ
   * デフォルトは$idName
   */
  idNameProperty?: string;
};

/**
 * エンティティインターフェイス
 */
export interface Entity<I extends EntityItem = EntityItem> extends Identifiable, Evented {
  /**
   * エンティティのインスタンスであるか
   */
  readonly isEntity: true;

  /**
   * ID
   */
  readonly $id: string;

  /**
   * 要素
   */
  readonly item: I;

  /**
   * 項目値を取得する
   * @param name 項目名
   * @returns
   */
  get<V = unknown>(name: string): V;

  /**
   * 項目に値を設定する
   * @param name 項目名
   * @param value 値
   * @param silent trueの場合、updateイベントを発火しない
   * @returns 値が変更された場合にtrue
   */
  set<V = unknown>(name: string, value: V, silent?: boolean): boolean;

  /**
   * 項目値の更新
   * @param updates 更新情報
   * @param silent trueの場合、updateイベントを発火しない
   * @returns 値が変更された場合にtrue
   */
  update(updates: Partial<I>, silent?: boolean): boolean;
}
