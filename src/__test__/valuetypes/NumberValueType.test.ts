import { VALUE_TYPE_TYPES, ValueTypeFactory } from 'src/valuetypes';
import NumberValueType from 'src/valuetypes/NumberValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: NumberValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.NUMBER);
      expect(result).toBeInstanceOf(NumberValueType);
    });
  });
});

describe('NumberValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: NumberValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.NUMBER),
        result = valuetype.format(12345.6789);
      expect(result).toBe('12,345.679');
    });
  });
  describe('parse', () => {
    test('default', () => {
      const valuetype: NumberValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.NUMBER),
        result = valuetype.parse('12,345.678');
      expect(result).toEqual(12345.678);
    });
  });
  describe('serialize', () => {
    test('default', () => {
      const valuetype: NumberValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.NUMBER),
        result = valuetype.serialize(12345.6789);
      expect(result).toBe(12345.6789);
    });
  });
});
