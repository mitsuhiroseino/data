/**
 * 種別
 */
const VALIDATOR_TYPES = {
  /**
   * 文字列の桁数、配列・オブジェクトの要素数が指定の範囲内か
   */
  LENGTH_RANGE: 'lengthrange',

  /**
   * 文字列の桁数、配列・オブジェクトの要素数が指定の数以下か
   */
  MAX_LENGTH: 'maxlength',

  /**
   * 値が指定の数以下か
   */
  MAX: 'max',

  /**
   * 文字列の桁数、配列・オブジェクトの要素数が指定の数以上か
   */
  MIN_LENGTH: 'minlength',

  /**
   * 値が指定の数以上か
   */
  MIN: 'min',

  /**
   * 値が指定の範囲内か
   */
  RANGE: 'range',

  /**
   * 値が入力されているか
   */
  REQUIRED: 'required',
} as const;
export default VALIDATOR_TYPES;
