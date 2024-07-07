import { Formatter, FormatterConfig } from '@visue/datakit/formatters';
import { Parser, ParserConfig } from '@visue/datakit/parsers';
import { Identifiable, IdentifiableConfig } from '@visue/utils';
import { ToValidValueOptions } from '@visue/utils/lang/toValidValue';

/**
 * コンフィグ
 */
export type ValueTypeConfig<
  P extends ParserConfig = ParserConfig,
  F extends FormatterConfig = FormatterConfig,
> = IdentifiableConfig &
  ToValidValueOptions<string> & {
    /**
     * パーサー
     */
    parser?: string | Parser | P;

    /**
     * フォーマッター
     */
    formatter?: string | Formatter | F;
  };

/**
 * 値型のインターフェイス
 */
export interface ValueType<V = any> extends Identifiable {
  /**
   * ValueTypeのインスタンスであるか
   */
  isValueType: true;

  /**
   * 任意の値から目的の型の値に変換する
   */
  parse(source: any): V;

  /**
   * 目的の型の値をテキストファイルへの保存や、リクエストの送信時に利用する型に変換する
   */
  serialize(value: V): any;

  /**
   * 目的の型の値を表示用の形式に変換する
   * @param value
   */
  format(value: V): string;
}
