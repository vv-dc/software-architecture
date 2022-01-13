export interface Cache<T = any> {
  get(key: CacheKey): T | undefined;
  set(key: CacheKey, value: T): void;
  del(key: CacheKey): void;
  has(key: CacheKey): boolean;
}
