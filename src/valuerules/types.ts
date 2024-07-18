import { Destructible } from '@visue/core/DestructibleBase';
import { Formatter, FormatterConfig } from '@visue/datakit/formatters';
import { Parser, ParserConfig } from '@visue/datakit/parsers';
import { Identifiable, IdentifiableConfig } from '@visue/utils';
import { Validator, ValidatorConfig } from '../validators';
import RequiredValidator, { RequiredValidatorConfig } from '../validators/RequiredValidator';

/**
 * コンフィグ
 */
export type ValueRuleConfig = IdentifiableConfig & {
  /**
   * フィールド名
   */
  name: string;

  /**
   * 必須
   */
  required?: boolean | RequiredValidator | RequiredValidatorConfig;

  /**
   * バリデーター
   */
  validators?: (Validator | ValidatorConfig)[];

  /**
   * パーサー
   */
  parser?: Parser | ParserConfig;

  /**
   * フォーマッター
   */
  formatter?: Formatter | FormatterConfig;
};

/**
 * validateメソッドのオプション
 */
export type ValidateOptions = {
  /**
   * 出力対象が繰り返し項目だった時に指定する
   */
  index?: number;
};

/**
 * 値規定のインターフェイス
 * 下記の機能を持つ
 *
 * - 名称
 * - データ型(typedの場合のみ)
 * - バリデーション
 * - パース
 * - フォーマット
 * - シリアライズ
 */
export interface ValueRule<V = any, F = string> extends Identifiable, Destructible {
  /**
   * ValueRuleのインスタンスであるか
   */
  isValueRule: true;

  /**
   * フィールド名
   */
  readonly name: string;

  /**
   * 値の検証
   * @param value
   * @returns
   */
  validate(value: V, options?: ValidateOptions): string | null;

  /**
   * 任意の値から目的の型の値に変換する
   */
  parse(target: unknown): V;

  /**
   * サーバー送信、ファイル保存時用の形式に変換する
   */
  serialize(value: V): any;

  /**
   * 表示用の形式に変換する
   * @param value
   */
  format(value: V): F;
}
