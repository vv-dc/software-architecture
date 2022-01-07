import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Cache } from '@shared/modules/cache/model/cache';
import { ObjectCache } from '@shared/modules/cache/object-cache';

const cache: FastifyPluginAsync = async (fastify) => {
  const cache: Cache = new ObjectCache();
  fastify.decorate('cache', cache);
};

export default fp(cache, { name: 'cache' });
