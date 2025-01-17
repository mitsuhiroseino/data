/**
 * 種別
 */
const VALUE_TYPE_TYPES = {
  /**
   * 任意の値
   */
  ANY: 'any',

  /**
   * booleanの値
   */
  BOOLEAN: 'boolean',

  /**
   * Dateの値
   */
  DATE: 'date',

  /**
   * numberの値
   */
  NUMBER: 'number',

  /**
   * objectの値
   */
  OBJECT: 'object',

  /**
   * stringの値
   */
  STRING: 'string',
} as const;
export default VALUE_TYPE_TYPES;
