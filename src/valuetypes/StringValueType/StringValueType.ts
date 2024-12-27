import VALUE_TYPE_TYPES from '../VALUE_TYPE_TYPES';
import ValueTypeBase from '../ValueTypeBase';
import { StringValueTypeConfig } from './types';

/**
 * string
 */
class StringValueType<C extends StringValueTypeConfig = StringValueTypeConfig> extends ValueTypeBase<string, C> {
  protected _type = VALUE_TYPE_TYPES.STRING;
}
export default StringValueType;
