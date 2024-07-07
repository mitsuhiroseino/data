import { ValueTypeFactory } from 'src/data/valuetypes';
import ObjectValueType from 'src/data/valuetypes/ObjectValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: ObjectValueType = ValueTypeFactory.create(ObjectValueType.TYPE);
      expect(result).toBeInstanceOf(ObjectValueType);
    });
  });
});

describe('ObjectValueType', () => {
  // 1999-01-01T18:40:56.789Z
  const DATE = new Date(1999, 0, 2, 3, 40, 56, 789),
    OBJECT = { string: 'あ', number: 1, boolean: true, date: DATE };

  describe('format', () => {
    test('default', () => {
      const valuetype: ObjectValueType = ValueTypeFactory.create(ObjectValueType.TYPE),
        result = valuetype.format(OBJECT);
      expect(result).toBe('{"string":"あ","number":1,"boolean":true,"date":"1999-01-01T18:40:56.789Z"}');
    });
  });

  describe('parse', () => {
    test('default', () => {
      const valuetype: ObjectValueType = ValueTypeFactory.create(ObjectValueType.TYPE),
        result = valuetype.parse('{"string":"あ","number":1,"boolean":true,"date":"1999-01-01T18:40:56.789Z"}');
      expect(result).toEqual({
        ...OBJECT,
        date: '1999-01-01T18:40:56.789Z',
      });
    });
  });

  describe('serialize', () => {
    test('default', () => {
      const valuetype: ObjectValueType = ValueTypeFactory.create(ObjectValueType.TYPE),
        result = valuetype.serialize(OBJECT);
      expect(result).toEqual(OBJECT);
    });
  });
});
