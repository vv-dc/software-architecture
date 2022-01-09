import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('products', (table) => {
    table.dropColumn('external_name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('products', (table) => {
    table.string('external_name', 120).notNullable().defaultTo('MAIN');
  });
}
