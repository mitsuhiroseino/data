import { ValueTypeFactory } from 'src/data/valuetypes';
import StringValueType from 'src/data/valuetypes/StringValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: StringValueType = ValueTypeFactory.create(StringValueType.TYPE);
      expect(result).toBeInstanceOf(StringValueType);
    });
  });
});

describe('StringValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: StringValueType = ValueTypeFactory.create(StringValueType.TYPE),
        result = valuetype.format('ABCDEFG');
      expect(result).toBe('ABCDEFG');
    });
  });
  describe('parse', () => {
    test('default', () => {
      const valuetype: StringValueType = ValueTypeFactory.create(StringValueType.TYPE),
        result = valuetype.parse('ABCDEFG');
      expect(result).toBe('ABCDEFG');
    });
  });
  describe('serialize', () => {
    test('default', () => {
      const valuetype: StringValueType = ValueTypeFactory.create(StringValueType.TYPE),
        result = valuetype.serialize('ABCDEFG');
      expect(result).toBe('ABCDEFG');
    });
  });
});
