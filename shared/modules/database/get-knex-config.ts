import { DatabaseConfig } from '../../model/config';
import { Knex } from 'knex';
import { camelCaseToSnakeCase, objectToCamelCase } from '../../lib/case.utils';

export const getKnexConfig = (dbConfig: DatabaseConfig): Knex.Config => {
  return {
    client: 'pg',
    connection: dbConfig,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    wrapIdentifier: (value) => camelCaseToSnakeCase(value),
    postProcessResponse: (result) => objectToCamelCase(result),
  } as Knex.Config;
};
