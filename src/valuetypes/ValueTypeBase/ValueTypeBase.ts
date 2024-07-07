import ConfigurableBase from '@visue/core/base/ConfigurableBase';
import { Formatter, FormatterConfig, FormatterFactory } from '@visue/datakit/formatters';
import { Parser, ParserConfig, ParserFactory } from '@visue/datakit/parsers';
import { EasyProductConfig } from '@visue/factory';
import assignIdentifier from '@visue/utils/identifier/assignIdentifier';
import toValidValue from '@visue/utils/lang/toValidValue';
import isPlainObject from 'lodash/isPlainObject';
import { ValueType } from '../types';
import { ValueTypeBaseConfig } from './types';

/**
 * 値
 */
abstract class ValueTypeBase<V = any, C extends ValueTypeBaseConfig = ValueTypeBaseConfig>
  extends ConfigurableBase<C>
  implements ValueType<V>
{
  readonly isValueType = true;

  protected abstract _type: string;

  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName?: string;

  /**
   * パーサー
   */
  private _parser!: Parser;

  /**
   * フォーマッター
   */
  private _formatter!: Formatter;

  constructor(config?: C) {
    super(config);
    assignIdentifier(this, this.config);
    const { parser, formatter } = this.config;
    this._parser = ParserFactory.get(this._getParserCfg(parser));
    this._formatter = FormatterFactory.get(this._getFormatterCfg(formatter));
  }

  private _getParserCfg(
    parser: string | ParserConfig | Parser | undefined,
  ): string | EasyProductConfig<ParserConfig> | Parser {
    if (!parser || isPlainObject(parser)) {
      // undefined or ParserConfig
      return this._getParserConfig(parser as ParserConfig | undefined);
    } else {
      // string or Parser
      return parser as string | Parser;
    }
  }

  protected _getParserConfig(parser: ParserConfig | undefined): EasyProductConfig<ParserConfig> {
    return { type: this._type, ...parser };
  }

  protected _getFormatterCfg(
    formatter: string | FormatterConfig | Formatter | undefined,
  ): string | EasyProductConfig<FormatterConfig> | Formatter {
    if (!formatter || isPlainObject(formatter)) {
      // undefined or FormatterConfig
      return this._getFormatterConfig(formatter as FormatterConfig | undefined);
    } else {
      // string or Formatter
      return formatter as string | Formatter;
    }
  }

  protected _getFormatterConfig(formatter: FormatterConfig | undefined): EasyProductConfig<FormatterConfig> {
    return { type: this._type, ...formatter };
  }

  /**
   * 引数として渡されたsourceから値を取得する
   * @param source
   */
  parse(source: string): V {
    return this._parser.parse(source);
  }

  serialize(value: V): any {
    const config = this.config,
      validValue = toValidValue(value, config);

    if (validValue !== value) {
      // undefined または nullの場合の値が指定されていた場合
      return validValue;
    }

    let error;
    try {
      // シリアライズを実行
      const result = this._serialize(value);
      if (result != null) {
        return result;
      }
    } catch (e) {
      error = e;
    }
    // シリアライズできなかった場合
    if ('defaultValue' in config) {
      return config.defaultValue;
    } else {
      throw error || new Error(`${value} is an invalid value to serialize.`);
    }
  }

  /**
   * 目的の型の値をテキストファイルへの保存や、リクエストの送信時に利用する形式に変換する
   * @param value 値
   * @returns
   */
  protected _serialize(value: V): any | undefined {
    return value;
  }

  /**
   * 目的の型の値を表示用の形式に変換する
   * @param value
   */
  format(value: V): string {
    return this._formatter.format(value);
  }
}
export default ValueTypeBase;
