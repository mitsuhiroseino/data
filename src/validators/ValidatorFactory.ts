import EasyFactory from '@visue/factory/easy/EasyFactory';
import LengthRangeValidator from './LengthRangeValidator';
import MaxLengthValidator from './MaxLengthValidator';
import MaxValidator from './MaxValidator';
import MinLengthValidator from './MinLengthValidator';
import MinValidator from './MinValidator';
import RangeValidator from './RangeValidator';
import RequiredValidator from './RequiredValidator';
import { VALIDATOR_TYPES } from './constants';
import { Validator } from './types';

const ValidatorFactory = new EasyFactory<Validator>({
  category: 'validator',
  products: [
    { type: VALIDATOR_TYPES.LENGTH_RANGE, Class: LengthRangeValidator },
    { type: VALIDATOR_TYPES.MAX_LENGTH, Class: MaxLengthValidator },
    { type: VALIDATOR_TYPES.MAX, Class: MaxValidator },
    { type: VALIDATOR_TYPES.MIN_LENGTH, Class: MinLengthValidator },
    { type: VALIDATOR_TYPES.MIN, Class: MinValidator },
    { type: VALIDATOR_TYPES.RANGE, Class: RangeValidator },
    { type: VALIDATOR_TYPES.REQUIRED, Class: RequiredValidator },
  ],
});
export default ValidatorFactory;
