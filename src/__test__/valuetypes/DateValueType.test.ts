import { ValueTypeFactory } from 'src/data/valuetypes';
import DateValueType from 'src/data/valuetypes/DateValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: DateValueType = ValueTypeFactory.create(DateValueType.TYPE);
      expect(result).toBeInstanceOf(DateValueType);
    });
  });
});

describe('DateValueType', () => {
  // JST: 1999/01/02 03:40:56.789
  // UTC: 1999/01/01 18:40:56.789
  const DATE = new Date(1999, 0, 2, 3, 40, 56, 789);

  describe('format', () => {
    test('default', () => {
      const valuetype: DateValueType = ValueTypeFactory.create(DateValueType.TYPE),
        result = valuetype.format(DATE);
      expect(result).toBe('1999/01/02 03:40:56.789');
    });
  });

  describe('parse', () => {
    test('default', () => {
      const valuetype: DateValueType = ValueTypeFactory.create(DateValueType.TYPE),
        result = valuetype.parse('1999/01/02 03:40:56.789');
      expect(result).toEqual(DATE);
    });
  });

  describe('serialize', () => {
    test('default', () => {
      const valuetype: DateValueType = ValueTypeFactory.create(DateValueType.TYPE),
        result = valuetype.serialize(DATE);
      expect(result).toBe('1999-01-01T18:40:56.789Z');
    });
  });
});
