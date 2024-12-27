import VALUE_TYPE_TYPES from '../VALUE_TYPE_TYPES';
import ValueTypeBase from '../ValueTypeBase';
import { BooleanValueTypeConfig } from './types';

/**
 * boolean
 */
class BooleanValueType<C extends BooleanValueTypeConfig = BooleanValueTypeConfig> extends ValueTypeBase<boolean, C> {
  protected _type = VALUE_TYPE_TYPES.BOOLEAN;
}
export default BooleanValueType;
