import { VALUE_TYPE_TYPES, ValueTypeFactory } from 'src/valuetypes';
import BooleanValueType from 'src/valuetypes/BooleanValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: BooleanValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.BOOLEAN);
      expect(result).toBeInstanceOf(BooleanValueType);
    });
  });
});

describe('BooleanValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: BooleanValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.BOOLEAN),
        result = valuetype.format(true);
      expect(result).toBe('true');
    });
  });
  describe('parse', () => {
    test('default', () => {
      const valuetype: BooleanValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.BOOLEAN),
        result = valuetype.parse('true');
      expect(result).toBe(true);
    });
  });
  describe('serialize', () => {
    test('default', () => {
      const valuetype: BooleanValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.BOOLEAN),
        result = valuetype.serialize(true);
      expect(result).toBe(true);
    });
  });
});
