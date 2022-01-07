import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.integer('parent_id').references('categories.id');
    table.string('name', 120).notNullable().unique();
  });

  await knex.schema.createTable('countries', (table) => {
    table.increments('id').primary();
    table.string('name', 120).notNullable().unique();
  });

  await knex.schema.createTable('suppliers', (table) => {
    table.increments('id').primary();
    table.integer('country_id').notNullable().references('countries.id');
    table.string('company_name', 120).notNullable();
    table.string('contact_name', 30).notNullable();
    table.string('email', 255).notNullable().unique();
  });

  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.integer('supplier_id').notNullable().references('suppliers.id');
    table.integer('category_id').notNullable().references('categories.id');
    table.string('external_name', 120).notNullable().defaultTo('MAIN');
    table.string('name', 120).notNullable().unique();
    table.decimal('price', 15, 4).notNullable();
    table.float('volume').notNullable();
    table.float('degree').notNullable();
    table.integer('units_in_stock').notNullable();
    table.float('discount');
    table.text('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
  await knex.schema.dropTable('suppliers');
  await knex.schema.dropTable('countries');
  await knex.schema.dropTable('categories');
}
