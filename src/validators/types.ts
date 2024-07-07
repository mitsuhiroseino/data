import { StringFormatterConfig } from '@visue/datakit/formatters/StringFormatter';
import { Identifiable, IdentifiableConfig } from '@visue/utils';

/**
 * コンフィグ
 */
export type ValidatorConfig = IdentifiableConfig &
  StringFormatterConfig & {
    /**
     * メッセージ定義
     */
    message?: string;

    /**
     * バリデーション対象の値をメッセージに埋め込む際に指定する文字列
     * デフォルトは`target`。
     * 例:
     *   - バリデーション対象の値: 'ABCDEF'
     *   - メッセージ定義: '{target}は不正な値です。'
     *   - メッセージ: 'ABCDEFは不正な値です。'
     */
    targetToken?: string;
  };

/**
 * バリデーターのインターフェイス
 */
export interface Validator<V = any> extends Identifiable {
  /**
   * Validatorのインスタンスであるか
   */
  isValidator: true;

  /**
   * 複数値用のバリデーター
   */
  readonly multi?: true;

  /**
   * 値の検証を行う
   * @param value 検証対象の値
   * @returns エラーメッセージ
   */
  validate: (value: V) => string | null;

  /**
   * エラーメッセージを取得する
   * @param target 対象の値
   */
  getErrorMessage(target: V): string;
}
