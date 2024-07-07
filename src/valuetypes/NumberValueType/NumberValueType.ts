import ValueTypeBase from '../ValueTypeBase';
import { VALUE_TYPE_TYPES } from '../constants';
import { NumberValueTypeConfig } from './types';

/**
 * number
 */
class NumberValueType<C extends NumberValueTypeConfig = NumberValueTypeConfig> extends ValueTypeBase<number, C> {
  protected _type = VALUE_TYPE_TYPES.NUMBER;
}
export default NumberValueType;
