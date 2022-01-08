import { FastifyPluginAsync } from 'fastify';
import { ListQuery } from '@model/api/product/list-query';
import { SearchQuery } from '@model/api/product/search-query';

export const secondRoutes: FastifyPluginAsync = async (fastify) => {
  const { secondService } = fastify;

  fastify.route<{ Querystring: SearchQuery }>({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: fastify.getSchema('search-query.api.json'),
      response: {
        200: fastify.getSchema('dto/search.dto.json'),
      },
    },
    handler: async (request, reply) => {
      const s = fastify.getSchema('search-query.json');
      const { query } = request;
      const products = await secondService.getProductsByQuery(query);
      reply.code(200).send(products);
    },
  });

  fastify.route<{ Querystring: ListQuery }>({
    method: 'GET',
    url: '/list',
    schema: {
      querystring: fastify.getSchema('list-query.api.json'),
      response: {
        200: fastify.getSchema('dto/list.dto.json'),
      },
    },
    handler: async (request, reply) => {
      const { page } = request.query;
      const listDto = await secondService.getListPage(page);
      reply.code(200).send(listDto);
    },
  });
};
