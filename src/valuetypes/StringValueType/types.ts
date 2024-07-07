import { StringFormatterConfig } from '@visue/datakit/formatters/StringFormatter';
import { StringParserConfig } from '@visue/datakit/parsers/StringParser';
import { ValueTypeBaseConfig } from '../ValueTypeBase';

/**
 * コンフィグ
 */
export type StringValueTypeConfig = ValueTypeBaseConfig<StringParserConfig, StringFormatterConfig>;
