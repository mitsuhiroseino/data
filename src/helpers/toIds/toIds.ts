import { Identifiable } from '@visue/utils';
import asArray from '@visue/utils/array/asArray';
import toId from '../toId';

const toIds = <T>(targets: T | T[]): string[] => {
  return asArray(targets).map((target) => toId(target as string | Identifiable));
};
export default toIds;
