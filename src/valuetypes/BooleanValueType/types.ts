import { BooleanFormatterConfig } from '@visue/datakit/formatters/BooleanFormatter';
import { BooleanParserConfig } from '@visue/datakit/parsers/BooleanParser';
import { ValueTypeBaseConfig } from '../ValueTypeBase';

/**
 * コンフィグ
 */
export type BooleanValueTypeConfig = ValueTypeBaseConfig<BooleanParserConfig, BooleanFormatterConfig>;
