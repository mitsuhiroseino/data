/**
 * 種別
 */
const VALUE_RULE_TYPES = {
  /**
   * 任意の値のルール
   */
  ANY: 'any',

  /**
   * 配列形式の値のルール
   */
  MULTIVALUE: 'multivalue',

  /**
   * データ種別を持つ値のルール
   */
  TYPED: 'typed',
} as const;
export default VALUE_RULE_TYPES;
