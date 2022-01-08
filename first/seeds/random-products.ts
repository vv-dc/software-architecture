import { Knex } from 'knex';
import * as generator from '../../shared/lib/random.utils';

const PRODUCTS_NUMBER = 50e3;

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del();

  const products = Array.from({ length: PRODUCTS_NUMBER }, () => ({
    name: generator.randomUuid('product', 120),
    price: generator.randomFloat(0, 500, 3),
    description: generator.randomText(5, 25),
  }));

  await knex.batchInsert('products', products);
}
