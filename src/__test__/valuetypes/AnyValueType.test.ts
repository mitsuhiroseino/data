import { VALUE_TYPE_TYPES, ValueTypeFactory } from 'src/valuetypes';
import AnyValueType, { AnyValueTypeConfig } from 'src/valuetypes/AnyValueType';

describe('Factory', () => {
  describe('create', () => {
    test('type', () => {
      const result: AnyValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.ANY);
      expect(result).toBeInstanceOf(AnyValueType);
    });
  });
});

describe('AnyValueType', () => {
  describe('format', () => {
    test('default', () => {
      const valuetype: AnyValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.ANY),
        result = valuetype.format(123);
      expect(result).toBe(123);
    });
    describe('options', () => {
      test('formatter != null', () => {
        const config: AnyValueTypeConfig = { formatter: { format: (value: any, options: any) => `${value}!` } },
          valuetype: AnyValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.ANY, [config]),
          result = valuetype.format(123);
        expect(result).toBe('123!');
      });
    });
  });

  describe('parse', () => {
    test('default', () => {
      const valuetype: AnyValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.ANY),
        result = valuetype.parse('123');
      expect(result).toBe('123');
    });

    describe('options', () => {
      test('parser != null', () => {
        const valuetype = ValueTypeFactory.create<AnyValueType>(VALUE_TYPE_TYPES.ANY, [
            {
              parser: { parse: (value: any, options: any) => Number(value) * 10 },
            },
          ]),
          result = valuetype.parse('123');
        expect(result).toBe(1230);
      });
    });
  });

  describe('serialize', () => {
    describe('default', () => {
      test('"Success"', () => {
        const valuetype: AnyValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.ANY),
          result = valuetype.serialize('123');
        expect(result).toBe('123');
      });

      test('"Error"', () => {
        const valuetype: AnyValueType = ValueTypeFactory.create(VALUE_TYPE_TYPES.ANY),
          fn = () => valuetype.serialize(null);
        expect(fn).toThrowError('null is an invalid value to serialize.');
      });
    });

    describe('options', () => {
      test('undefinedValue', () => {
        const valuetype = ValueTypeFactory.create<AnyValueType>(VALUE_TYPE_TYPES.ANY, [
            {
              undefinedValue: 'UNDEFINED',
            },
          ]),
          result = valuetype.serialize(undefined);
        expect(result).toBe('UNDEFINED');
      });

      test('nullValue', () => {
        const valuetype = ValueTypeFactory.create<AnyValueType>(VALUE_TYPE_TYPES.ANY, [
            {
              nullValue: 'NULL',
            },
          ]),
          result = valuetype.serialize(null);
        expect(result).toBe('NULL');
      });

      test('defaultValue', () => {
        const valuetype = ValueTypeFactory.create<AnyValueType>(VALUE_TYPE_TYPES.ANY, [
            {
              defaultValue: 'DEFAULT',
            },
          ]),
          result = valuetype.serialize(null);
        expect(result).toBe('DEFAULT');
      });
    });
  });
});
