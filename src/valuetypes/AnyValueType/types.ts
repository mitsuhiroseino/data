import { AnyFormatterConfig } from '@visue/datakit/formatters/AnyFormatter';
import { AnyParserConfig } from '@visue/datakit/parsers/AnyParser';
import { ValueTypeBaseConfig } from '../ValueTypeBase';

/**
 * コンフィグ
 */
export type AnyValueTypeConfig = ValueTypeBaseConfig<AnyParserConfig, AnyFormatterConfig>;
