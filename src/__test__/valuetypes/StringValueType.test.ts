import { VALUE_TYPE_TYPES, ValueTypeFactory } from 'src/valuetypes';
import StringValueType from 'src/valuetypes/StringValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: StringValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.STRING);
      expect(result).toBeInstanceOf(StringValueType);
    });
  });
});

describe('StringValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: StringValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.STRING),
        result = valuetype.format('ABCDEFG');
      expect(result).toBe('ABCDEFG');
    });
  });
  describe('parse', () => {
    test('default', () => {
      const valuetype: StringValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.STRING),
        result = valuetype.parse('ABCDEFG');
      expect(result).toBe('ABCDEFG');
    });
  });
  describe('serialize', () => {
    test('default', () => {
      const valuetype: StringValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.STRING),
        result = valuetype.serialize('ABCDEFG');
      expect(result).toBe('ABCDEFG');
    });
  });
});
