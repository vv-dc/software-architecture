import 'dotenv/config';
import { join } from 'path';
import {
  DatabaseConfig,
  SchemaConfig,
  ServerConfig,
} from '@shared/model/config';

export const config = {
  server: {
    port: process.env.PORT ?? 8080,
    host: process.env.HOST ?? '0.0.0.0',
    logger: true,
  } as ServerConfig,
  api: {
    priceListDelay: 20e3, // 20 seconds
  },
  database: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT ?? '', 10),
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
  } as DatabaseConfig,
  schemas: {
    path: join(__dirname, '../', 'schemas/'),
  } as SchemaConfig,
};
