import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { MainDao } from '@plugins/main/main.dao';
import { MainService } from '@plugins/main/main.service';
import { mainRoutes } from '@plugins/main/main.route';
import { FirstService } from '@plugins/main/first/first.service';
import { SecondService } from '@plugins/main/second/second.service';

export const main: FastifyPluginAsync = async (fastify) => {
  const { db, cache } = fastify;

  const firstService = new FirstService(cache);
  const secondService = new SecondService(cache);

  const mainDao = new MainDao(db);
  const mainService = new MainService(mainDao, firstService, secondService);
  await mainService.scheduleCacheUpdate();
  await mainService.updateCache();

  fastify.decorate('mainService', mainService);
  fastify.register(mainRoutes, { prefix: '/api/public' });
};

export default fp(main, {
  name: 'main',
  decorators: {
    fastify: ['cache'],
  },
  dependencies: ['db', 'schema', 'cache'],
});
