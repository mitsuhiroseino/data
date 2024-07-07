import { ValueTypeFactory } from 'src/data/valuetypes';
import AnyValueType, { AnyValueTypeConfig } from 'src/data/valuetypes/AnyValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: AnyValueType = ValueTypeFactory.create(AnyValueType.TYPE);
      expect(result).toBeInstanceOf(AnyValueType);
    });
  });
});

describe('AnyValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: AnyValueType = ValueTypeFactory.create(AnyValueType.TYPE),
        result = valuetype.format(123);
      expect(result).toBe(123);
    });
    describe('options', () => {
      test('formatter != null', () => {
        const config: AnyValueTypeConfig = { formatter: { format: (value: any, options: any) => `${value}!` } },
          valuetype: AnyValueType = ValueTypeFactory.create(AnyValueType.TYPE, config),
          result = valuetype.format(123);
        expect(result).toBe('123!');
      });
    });
  });

  describe('parse', () => {
    test('default', () => {
      const valuetype: AnyValueType = ValueTypeFactory.create(AnyValueType.TYPE),
        result = valuetype.parse('123');
      expect(result).toBe('123');
    });

    describe('options', () => {
      test('parser != null', () => {
        const valuetype = ValueTypeFactory.create<AnyValueTypeConfig, AnyValueType>(AnyValueType.TYPE, {
            parser: { parse: (value: any, options: any) => Number(value) * 10 },
          }),
          result = valuetype.parse('123');
        expect(result).toBe(1230);
      });
    });
  });

  describe('serialize', () => {
    describe('default', () => {
      test('"Success"', () => {
        const valuetype: AnyValueType = ValueTypeFactory.create(AnyValueType.TYPE),
          result = valuetype.serialize('123');
        expect(result).toBe('123');
      });

      test('"Error"', () => {
        const valuetype: AnyValueType = ValueTypeFactory.create(AnyValueType.TYPE),
          fn = () => valuetype.serialize(null);
        expect(fn).toThrowError('null is an invalid value to serialize.');
      });
    });

    describe('options', () => {
      test('undefinedValue', () => {
        const valuetype = ValueTypeFactory.create<AnyValueTypeConfig, AnyValueType>(AnyValueType.TYPE, {
            undefinedValue: 'UNDEFINED',
          }),
          result = valuetype.serialize(undefined);
        expect(result).toBe('UNDEFINED');
      });

      test('nullValue', () => {
        const valuetype = ValueTypeFactory.create<AnyValueTypeConfig, AnyValueType>(AnyValueType.TYPE, {
            nullValue: 'NULL',
          }),
          result = valuetype.serialize(null);
        expect(result).toBe('NULL');
      });

      test('defaultValue', () => {
        const valuetype = ValueTypeFactory.create<AnyValueTypeConfig, AnyValueType>(AnyValueType.TYPE, {
            defaultValue: 'DEFAULT',
          }),
          result = valuetype.serialize(null);
        expect(result).toBe('DEFAULT');
      });
    });
  });
});
