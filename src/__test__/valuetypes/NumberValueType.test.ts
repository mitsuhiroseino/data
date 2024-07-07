import { ValueTypeFactory } from 'src/data/valuetypes';
import NumberValueType from 'src/data/valuetypes/NumberValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: NumberValueType = ValueTypeFactory.create(NumberValueType.TYPE);
      expect(result).toBeInstanceOf(NumberValueType);
    });
  });
});

describe('NumberValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: NumberValueType = ValueTypeFactory.create(NumberValueType.TYPE),
        result = valuetype.format(12345.6789);
      expect(result).toBe('12,345.679');
    });
  });
  describe('parse', () => {
    test('default', () => {
      const valuetype: NumberValueType = ValueTypeFactory.create(NumberValueType.TYPE),
        result = valuetype.parse('12,345.678');
      expect(result).toEqual(12345.678);
    });
  });
  describe('serialize', () => {
    test('default', () => {
      const valuetype: NumberValueType = ValueTypeFactory.create(NumberValueType.TYPE),
        result = valuetype.serialize(12345.6789);
      expect(result).toBe(12345.6789);
    });
  });
});
