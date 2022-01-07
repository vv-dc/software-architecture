import { FastifyPluginAsync } from 'fastify';

import { ProductParams } from '@model/api/product/product-params';
import { ProductCreateBody } from '@model/api/product/product-create-body';
import { ProductUpdateBody } from '@model/api/product/product-update-body';
import { SearchQuery } from '@model/api/product/search-query';

export const mainRoutes: FastifyPluginAsync = async (fastify) => {
  const { mainService } = fastify;

  fastify.route<{ Querystring: SearchQuery }>({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: fastify.getSchema('api/product/search-query.json#'),
      response: {
        200: fastify.getSchema('dto/products.dto.json'),
      },
    },
    handler: async (request, reply) => {
      const { query } = request;
      const products = await mainService.getProductsByQuery(query);
      reply.code(200).send(products);
    },
  });

  fastify.route<{ Params: ProductParams }>({
    method: 'GET',
    url: '/products/:id',
    schema: {
      params: fastify.getSchema('api/product/product-params.json'),
      response: {
        200: fastify.getSchema('dto/product.dto.json'),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const product = await mainService.getProductById(id);
      reply.code(200).send(product);
    },
  });

  fastify.route<{ Params: ProductParams }>({
    method: 'DELETE',
    url: '/products/:id',
    schema: {
      params: fastify.getSchema('api/product/product-params.json'),
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      await mainService.deleteProductById(id);
      reply.code(204).send();
    },
  });

  fastify.route<{ Params: ProductParams; Body: ProductUpdateBody }>({
    method: 'PUT',
    url: '/products/:id',
    schema: {
      params: fastify.getSchema('api/product/product-params.json'),
      body: fastify.getSchema('dto/update-product.dto.json#'),
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { body: dto } = request;
      await mainService.updateProductById(id, dto);
      reply.code(204).send();
    },
  });

  fastify.route<{ Body: ProductCreateBody }>({
    method: 'POST',
    url: '/products',
    schema: {
      body: fastify.getSchema('dto/create-product.dto.json'),
    },
    handler: async (request, reply) => {
      const { body: dto } = request;
      await mainService.createProduct(dto);
      reply.code(201).send();
    },
  });
};
