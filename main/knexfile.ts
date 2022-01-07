import { config } from './src/config/config';
import { getKnexConfig } from 'shared/modules/database/get-knex-config';

export const knexConfig = getKnexConfig(config.database);
export default knexConfig;
