import DestructibleBase from '@visue/core/DestructibleBase';
import { MESSAGE_LEVEL, MESSAGE_TYPE, Message } from '@visue/message';
import { TargetSetOptions } from '@visue/message/notifier/TargetMessageNotifier';
import assignIdentifier from '@visue/utils/identifier/assignIdentifier';
import isBoolean from 'lodash/isBoolean';
import { Validator, ValidatorConfig, ValidatorFactory } from '../../validators';
import RequiredValidator from '../../validators/RequiredValidator';
import { ValidateOptions, ValueRule } from '../types';
import { ValueRuleBaseConfig } from './types';

/**
 * 値
 */
abstract class ValueRuleBase<V = any, F = string, C extends ValueRuleBaseConfig = ValueRuleBaseConfig>
  extends DestructibleBase<C>
  implements ValueRule<V, F>
{
  readonly isValueRule = true;

  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName?: string;

  /**
   * フィールド名
   */
  readonly name!: string;

  /**
   * 必須
   */
  protected _isRequired!: boolean;

  /**
   * 必須バリデーター
   */
  protected _required?: RequiredValidator;

  /**
   * バリデーター
   */
  protected _validators!: Validator[];

  constructor(config?: C) {
    super(config);
    assignIdentifier(this, this.config);
    this.name = this.config.name;
    const cfg = this.config;
    const { required = false, validators = [] } = cfg;
    // 必須チェック用バリデーターの設定
    this._isRequired = !!required;
    this._required = this._getRequiredValidator(required);
    // その他のバリデーターの設定
    this._validators = validators.map((validator) => ValidatorFactory.get(validator));
  }

  /**
   * 必須チェックのバリデーターを取得する
   */
  protected _getRequiredValidator(required: boolean | Validator | ValidatorConfig) {
    return ValidatorFactory.get<RequiredValidator>(isBoolean(required) ? 'required' : required);
  }

  validate(target: V, options: ValidateOptions): string | null {
    const me = this,
      // 必須チェック
      result = me._require(target);
    let message;
    if (result === true) {
      // その他のバリデーション
      message = me._validate(target);
    } else {
      // 必須エラー or 任意入力&未入力
      message = result;
    }
    if (message) {
      const opts: TargetSetOptions = {
        level: MESSAGE_LEVEL.ERROR,
        type: MESSAGE_TYPE.TARGET,
        target: me.config.name,
        ...options,
      };
      Message.set(message, opts);
    }
    return message;
  }

  /**
   * 必須入力チェック
   * @param target
   * @returns
   * - true: 値あり
   * - null: 値なし
   * - string: 値なし(エラー)
   */
  protected _require(target: V): true | null | string {
    const me = this,
      requiredMessage = me._required?.validate(target);
    if (requiredMessage != null) {
      // 値無し
      if (me._isRequired) {
        // 必須の場合はエラーメッセージを返す
        return requiredMessage;
      } else {
        // 任意の場合はnullを返す
        return null;
      }
    }
    // 後続のチェックが必要な場合はtrue
    return true;
  }

  /**
   * validatorsによるバリデーション
   * @param target
   * @returns
   */
  protected _validate(target: V): string | null {
    for (const validator of this._validators) {
      const errorMessage = validator.validate(target);
      if (errorMessage != null) {
        // エラーの場合はエラーメッセージを返す
        return errorMessage;
      }
    }
    return null;
  }

  parse(target: any): V {
    return this._parse(target);
  }

  protected abstract _parse(target: any): V;

  serialize(value: V): any {
    return this._serialize(value);
  }

  protected abstract _serialize(value: V): any;

  format(value: V): F {
    return this._format(value);
  }

  protected abstract _format(value: V): F;

  destructor(): void {
    this._deleteProperties(['_required', '_validators']);
    super.destructor();
  }
}
export default ValueRuleBase;
