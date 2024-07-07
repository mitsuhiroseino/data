import { ValueTypeFactory } from 'src/data/valuetypes';
import BooleanValueType from 'src/data/valuetypes/BooleanValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: BooleanValueType = ValueTypeFactory.create(BooleanValueType.TYPE);
      expect(result).toBeInstanceOf(BooleanValueType);
    });
  });
});

describe('BooleanValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: BooleanValueType = ValueTypeFactory.create(BooleanValueType.TYPE),
        result = valuetype.format(true);
      expect(result).toBe('true');
    });
  });
  describe('parse', () => {
    test('default', () => {
      const valuetype: BooleanValueType = ValueTypeFactory.create(BooleanValueType.TYPE),
        result = valuetype.parse('true');
      expect(result).toBe(true);
    });
  });
  describe('serialize', () => {
    test('default', () => {
      const valuetype: BooleanValueType = ValueTypeFactory.create(BooleanValueType.TYPE),
        result = valuetype.serialize(true);
      expect(result).toBe(true);
    });
  });
});
