import { Knex } from 'knex';
import * as generator from '../../shared/lib/random.utils';

const COUNTRIES_NUM = 100;
const SUPPLIERS_NUM = 100;
const CATEGORIES_NUM = 100;
const PRODUCTS_NUM = 100e3;

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del();
  await knex('suppliers').del();
  await knex('countries').del();
  await knex('categories').del();

  const countries = Array.from({ length: COUNTRIES_NUM }, () => ({
    name: generator.randomUuid('country', 120),
  }));
  const countryIds = await knex('countries').insert(countries).returning('id');

  const suppliers = Array.from({ length: SUPPLIERS_NUM }, () => ({
    country_id: generator.randomItem(countryIds),
    company_name: generator.randomUuid('company', 120),
    contact_name: generator.randomUuid('contact', 30),
    email: generator.randomEmail('mock.mock'),
  }));
  const suppliersIds = await knex('suppliers')
    .insert(suppliers)
    .returning('id');

  const categories = Array.from({ length: CATEGORIES_NUM }, () => ({
    name: generator.randomUuid('category', 120),
  }));
  const categoryIds = await knex('categories')
    .insert(categories)
    .returning('id');

  const products = Array.from({ length: PRODUCTS_NUM }, () => ({
    supplier_id: generator.randomItem(suppliersIds),
    category_id: generator.randomItem(categoryIds),
    name: generator.randomUuid('product', 120),
    price: generator.randomFloat(0, 500, 3),
    volume: generator.randomFloat(0, 3, 2),
    degree: generator.randomFloat(0, 1, 1),
    units_in_stock: generator.randomInteger(0, 500),
    discount: generator.randomFloat(0, 1, 3),
    description: generator.randomText(5, 25),
  }));
  await knex.batchInsert('products', products);
}
