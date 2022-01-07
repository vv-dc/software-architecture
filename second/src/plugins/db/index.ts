import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import knex from 'knex';

import knexConfig from 'knexfile';

const db: FastifyPluginAsync = async (fastify) => {
  const connection = knex(knexConfig);
  fastify.decorate('db', connection);
};

export default fp(db, { name: 'db' });
