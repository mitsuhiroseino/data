import ValueTypeBase from '../ValueTypeBase';
import { VALUE_TYPE_TYPES } from '../constants';
import { AnyValueTypeConfig } from './types';

/**
 * 任意の値取得クラス
 */
class AnyValueType<V = any> extends ValueTypeBase<V, AnyValueTypeConfig> {
  protected _type = VALUE_TYPE_TYPES.ANY;
}
export default AnyValueType;
