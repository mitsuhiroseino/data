import EasyFactory from '@visue/factory/easy/EasyFactory';
import AnyValueType from './AnyValueType';
import BooleanValueType from './BooleanValueType';
import DateValueType from './DateValueType';
import NumberValueType from './NumberValueType';
import ObjectValueType from './ObjectValueType';
import StringValueType from './StringValueType';
import { VALUE_TYPE_TYPES } from './constants';
import { ValueType } from './types';

const ValueTypeFactory = new EasyFactory<ValueType>({
  category: 'valuetype',
  products: [
    { type: VALUE_TYPE_TYPES.ANY, Class: AnyValueType },
    { type: VALUE_TYPE_TYPES.BOOLEAN, Class: BooleanValueType },
    { type: VALUE_TYPE_TYPES.DATE, Class: DateValueType },
    { type: VALUE_TYPE_TYPES.NUMBER, Class: NumberValueType },
    { type: VALUE_TYPE_TYPES.OBJECT, Class: ObjectValueType },
    { type: VALUE_TYPE_TYPES.STRING, Class: StringValueType },
  ],
});
export default ValueTypeFactory;
