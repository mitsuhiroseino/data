import { ObjectFormatterConfig } from '@visue/datakit/formatters/ObjectFormatter';
import { ObjectParserConfig } from '@visue/datakit/parsers/ObjectParser';
import { ValueTypeBaseConfig } from '../ValueTypeBase';

/**
 * コンフィグ
 */
export type ObjectValueTypeConfig = ValueTypeBaseConfig<ObjectParserConfig, ObjectFormatterConfig>;
