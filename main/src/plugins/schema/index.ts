import { readFileSync } from 'fs';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { getDirectoryFilesSync } from '@shared/lib/file.utils';

import { config } from '@config/config';

const schema: FastifyPluginAsync = async (fastify) => {
  const files = getDirectoryFilesSync(config.schemas.path);
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    fastify.addSchema(JSON.parse(content));
  }
};

export default fp(schema, { name: 'schema' });
