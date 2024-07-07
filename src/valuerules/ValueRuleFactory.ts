import EasyFactory from '@visue/factory/easy/EasyFactory';
import AnyValueRule from './AnyValueRule';
import MultiValueRule from './MultiValueRule';
import TypedValueRule from './TypedValueRule';
import { VALUE_RULE_TYPES } from './constants';
import { ValueRule } from './types';

const ValueRuleFactory = new EasyFactory<ValueRule>({
  category: 'valuerule',
  products: [
    { type: VALUE_RULE_TYPES.ANY, Class: AnyValueRule },
    { type: VALUE_RULE_TYPES.MULTIVALUE, Class: MultiValueRule },
    { type: VALUE_RULE_TYPES.TYPED, Class: TypedValueRule },
  ],
});
export default ValueRuleFactory;
