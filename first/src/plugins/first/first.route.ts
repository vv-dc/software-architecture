import { FastifyPluginAsync } from 'fastify';

import { config } from '@config/config';
import { delay } from '@lib/time.utils';
import { DetailsParams } from '@model/api/details/details-params';
import { PriceListQuery } from '@model/api/price-list/price-list-query';

export const firstRoutes: FastifyPluginAsync = async (fastify) => {
  const { firstService } = fastify;
  const { priceListDelay } = config.api;

  fastify.route<{ Params: DetailsParams }>({
    method: 'GET',
    url: '/details/:id',
    schema: {
      params: fastify.getSchema('api/details/details-params.json'),
      response: {
        200: fastify.getSchema('dto/details.json'),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const details = await firstService.getProductDetails(id);
      reply.code(200).send(details);
    },
  });

  fastify.route<{ Querystring: PriceListQuery }>({
    method: 'GET',
    url: '/price-list',
    schema: {
      querystring: fastify.getSchema('api/price-list/price-list-query.json'),
      response: {
        200: fastify.getSchema('dto/price-list.json'),
      },
    },
    handler: async (request, reply) => {
      const { limit } = request.query;
      const priceList = await firstService.getPriceList(limit);
      await delay(priceListDelay);
      reply.code(200).send(priceList);
    },
  });
};
