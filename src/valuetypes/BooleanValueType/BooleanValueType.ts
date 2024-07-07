import ValueTypeBase from '../ValueTypeBase';
import { VALUE_TYPE_TYPES } from '../constants';
import { BooleanValueTypeConfig } from './types';

/**
 * boolean
 */
class BooleanValueType<C extends BooleanValueTypeConfig = BooleanValueTypeConfig> extends ValueTypeBase<boolean, C> {
  protected _type = VALUE_TYPE_TYPES.BOOLEAN;
}
export default BooleanValueType;
