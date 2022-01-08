import { config } from './src/config/config';
import { getKnexConfig } from '../shared/modules/database/init-knex';

export const knexConfig = getKnexConfig(config.database);
export default knexConfig;
