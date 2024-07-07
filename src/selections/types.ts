import { Destructible } from '@visue/core/base/DestructibleBase';
import { EventHandlers, Observable } from '@visue/core/events';
import { Identifiable, IdentifiableConfig } from '@visue/utils';

/**
 * コンフィグ
 */
export type SelectionConfig = IdentifiableConfig & {
  /**
   * 複数選択可否
   */
  multi?: boolean;
};

/**
 * 選択情報
 */
export interface Selection<I extends Identifiable = Identifiable, H = EventHandlers>
  extends Observable<H>,
    Identifiable,
    Destructible {
  /**
   * Selectionのインスタンスであるか
   */
  readonly isSelection: true;

  /**
   * 要素を選択する
   * @param target 選択対象
   */
  select(target: I | I[]): void;

  /**
   * 要素の選択を解除する
   * @param target 選択解除対象
   */
  unselect(target: string | I | (string | I)[]): I[];

  /**
   * 全ての選択を解除する
   */
  clear(): I[];

  /**
   * 対象は選択されているか
   * @param target
   */
  has(target: string | I): boolean;
}
