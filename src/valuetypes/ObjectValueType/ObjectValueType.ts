import VALUE_TYPE_TYPES from '../VALUE_TYPE_TYPES';
import ValueTypeBase from '../ValueTypeBase';
import { ObjectValueTypeConfig } from './types';

/**
 * Object
 */
class ObjectValueType<C extends ObjectValueTypeConfig = ObjectValueTypeConfig> extends ValueTypeBase<any, C> {
  protected _type = VALUE_TYPE_TYPES.OBJECT;
}
export default ObjectValueType;
