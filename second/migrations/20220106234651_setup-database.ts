import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('external_name', 120).notNullable().defaultTo('SECOND');
    table.string('name', 120).notNullable().unique();
    table.decimal('price', 15, 4).notNullable();
    table.text('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}
