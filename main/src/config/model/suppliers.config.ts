export interface SuppliersConfig {
  first: {
    host: string;
    cacheKey: string;
    origin: string;
  };
  second: {
    host: string;
    cacheKey: string;
    origin: string;
  };
  main: {
    origin: string;
  };
}
