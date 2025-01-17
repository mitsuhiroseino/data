/**
 * 種別
 */
const ENTITY_TYPES = {
  /**
   * 他のエンティティを参照するエンティティ
   */
  CHAINED: 'chained',

  /**
   * データを持つエンティティ
   */
  DATA: 'data',

  /**
   * 何もしないエンティティ
   */
  NOOP: 'noop',

  /**
   * ツリー構造のデータを持つエンティティ
   */
  TREEDATA: 'treedata',
} as const;
export default ENTITY_TYPES;
