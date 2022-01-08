import { StringQuery } from './string-query';
import { NumberQuery } from './number-query';

export type WhereQuery<T> = {
  [key in keyof T]?: StringQuery | NumberQuery;
};
