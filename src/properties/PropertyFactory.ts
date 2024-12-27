import EasyFactory from '@visue/factory/easy/EasyFactory';
import MultiValueProperty from './MultiValueProperty';
import PROPERTY_TYPES from './PROPERTY_TYPES';
import TypedProperty from './TypedProperty';
import { Property } from './types';

const PropertyFactory = new EasyFactory<Property>({
  category: 'property',
  products: [
    { type: PROPERTY_TYPES.MULTIVALUE, Class: MultiValueProperty },
    { type: PROPERTY_TYPES.TYPED, Class: TypedProperty },
  ],
});
export default PropertyFactory;
