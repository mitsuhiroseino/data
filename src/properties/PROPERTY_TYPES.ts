/**
 * 種別
 */
const PROPERTY_TYPES = {
  /**
   * 配列で値を持つプロパティ
   */
  MULTIVALUE: 'multivalue',

  /**
   * データ種別を持つプロパティ
   */
  TYPED: 'typed',
} as const;
export default PROPERTY_TYPES;
