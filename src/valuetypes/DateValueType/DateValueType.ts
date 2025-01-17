import VALUE_TYPE_TYPES from '../VALUE_TYPE_TYPES';
import ValueTypeBase from '../ValueTypeBase';
import { DateValueTypeConfig } from './types';

/**
 * Date
 */
class DateValueType<C extends DateValueTypeConfig = DateValueTypeConfig> extends ValueTypeBase<Date, C> {
  protected _type = VALUE_TYPE_TYPES.DATE;

  protected _serialize(value: Date): any {
    return value.toISOString();
  }
}
export default DateValueType;
