import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE EXTENSION pg_trgm;
    CREATE EXTENSION btree_gin;
  `);
  await knex.schema.table('products', (table) => {
    table.index('name', 'index_product_name', 'GIN');
    table.index('description', 'index_product_description', 'GIN');
    table.index('price', 'index_product_price');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('products', (table) => {
    table.dropIndex('name', 'index_product_name');
    table.dropIndex('description', 'index_product_description');
    table.dropIndex('price', 'index_product_price');
  });
  await knex.raw(`
    DROP EXTENSION pg_trgm;
    DROP EXTENSION btree_gin;
  `);
}
