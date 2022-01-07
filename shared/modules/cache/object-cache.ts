import { Cache } from './model/cache';
import { CacheData } from './model/cache-data';
import { CacheKey } from './model/cache-key';

export class ObjectCache<T> implements Cache<T> {
  private data: CacheData<T> = {};

  clear(): void {
    this.data = {};
  }

  empty(): boolean {
    return Object.keys(this.data).length === 0;
  }

  set(key: CacheKey, value: T): void {
    this.data[key] = value;
  }

  get(key: CacheKey): T | undefined {
    return this.data[key];
  }

  del(key: CacheKey): void {
    delete this.data[key];
  }
}
