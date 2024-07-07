import ConfigurableBase from '@visue/core/base/ConfigurableBase';
import StringFormatter from '@visue/datakit/formatters/StringFormatter';
import assignIdentifier from '@visue/utils/identifier/assignIdentifier';
import { Validator } from '../types';
import { ValidatorBaseConfig } from './types';

/**
 * バリデーター
 */
abstract class ValidatorBase<V = any, C extends ValidatorBaseConfig = ValidatorBaseConfig>
  extends ConfigurableBase<C>
  implements Validator<V>
{
  readonly isValidator = true;

  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName?: string;

  /**
   * メッセージ
   */
  protected _message!: string;

  protected _formatter!: StringFormatter;

  constructor(config?: C) {
    super(config);
    assignIdentifier(this, this.config);
    const { message = this._getDefaultMessage(), ...rest } = this.config;
    this._message = message;
    this._formatter = new StringFormatter(rest);
  }

  /**
   * バリデーション毎の既定のメッセージを取得する
   */
  protected abstract _getDefaultMessage(): string;

  validate(target: V): string | null {
    const me = this;
    if (!me._validate(target)) {
      return me.getErrorMessage(target);
    }
    return null;
  }

  /**
   * バリデーションを実施する
   * @param target
   */
  protected abstract _validate(target: V): boolean;

  /**
   * エラーメッセージを取得する
   * @param target
   * @returns
   */
  getErrorMessage(target: V): string {
    const config = this.config,
      targetToken = config.targetToken || 'target',
      params = config.params;
    return this._formatter.format(this._message, { ...params, [targetToken]: target }) || 'error';
  }
}
export default ValidatorBase;
