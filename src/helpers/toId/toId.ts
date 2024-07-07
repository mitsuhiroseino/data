import { Identifiable } from '@visue/utils';
import isString from 'lodash/isString';

const toId = (target: string | Identifiable): string => {
  return isString(target) ? target : target.$id;
};
export default toId;
