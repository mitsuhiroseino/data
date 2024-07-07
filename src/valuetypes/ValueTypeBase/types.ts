import { ConfigurableConfigBase } from '@visue/core/base/ConfigurableBase';
import { FormatterConfig } from '@visue/datakit/formatters';
import { ParserConfig } from '@visue/datakit/parsers';
import { ValueTypeConfig } from '../types';

/**
 * コンフィグ
 */
export type ValueTypeBaseConfig<
  P extends ParserConfig = ParserConfig,
  F extends FormatterConfig = FormatterConfig,
> = ConfigurableConfigBase & ValueTypeConfig<P, F>;
