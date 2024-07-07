import { DateFormatterConfig } from '@visue/datakit/formatters/DateFormatter';
import { DateParserConfig } from '@visue/datakit/parsers/DateParser';
import { ValueTypeBaseConfig } from '../ValueTypeBase';

/**
 * コンフィグ
 */
export type DateValueTypeConfig = ValueTypeBaseConfig<DateParserConfig, DateFormatterConfig>;
