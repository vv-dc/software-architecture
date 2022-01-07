import { CacheKey } from '../object-cache';

export type CacheData<T> = Record<CacheKey, T>;
