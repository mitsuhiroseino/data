/**
 * 種別
 */
const COLLECTION_TYPES = {
  /**
   * 他のコレクションを参照するコレクション
   */
  CHAINED: 'chained',

  /**
   * データを持つコレクション
   */
  DATA: 'data',

  /**
   * 何もしないコレクション
   */
  NOOP: 'noop',
} as const;
export default COLLECTION_TYPES;
