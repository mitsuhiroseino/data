import { NumberFormatterConfig } from '@visue/datakit/formatters/NumberFormatter';
import { NumberParserConfig } from '@visue/datakit/parsers/NumberParser';
import { ValueTypeBaseConfig } from '../ValueTypeBase';

/**
 * コンフィグ
 */
export type NumberValueTypeConfig = ValueTypeBaseConfig<NumberParserConfig, NumberFormatterConfig>;
