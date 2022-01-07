import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').del();
  await knex('countries').del();
  await knex('suppliers').del();
  await knex('products').del();

  const categoryIds = await knex('categories')
    .insert([{ name: 'beer' }, { name: 'wine' }, { name: 'liquor' }])
    .returning('id');

  const countryIds = await knex('countries')
    .insert([
      { name: 'Ukraine' },
      { name: 'France' },
      { name: 'Italy' },
      { name: 'England' },
      { name: 'USA' },
    ])
    .returning('id');

  const supplierIds = await knex('suppliers')
    .insert([
      {
        country_id: countryIds[0],
        company_name: 'Obolon',
        contact_name: 'Bogdan Kravchuk',
        email: 'bogdankravchuk@gmail.com',
      },
      {
        country_id: countryIds[0],
        company_name: 'Nemiroff',
        contact_name: 'Vasyl Shevchenko',
        email: 'vasylshevschenko@gmail.com',
      },
      {
        country_id: countryIds[1],
        company_name: 'Paris',
        contact_name: 'Rene Monet',
        email: 'renemonet@gmail.com',
      },
      {
        country_id: countryIds[1],
        company_name: 'LaLaurent',
        contact_name: 'Bernadette Moulin',
        email: 'bernadettemoulin@gmail.com',
      },
      {
        country_id: countryIds[2],
        company_name: 'Dante',
        contact_name: 'Dionigi Gastone',
        email: 'dionigigastone@gmail.com',
      },
      {
        country_id: countryIds[2],
        company_name: 'Viva',
        contact_name: 'Angela Giovanni',
        email: 'angelagiovanni',
      },
    ])
    .returning('id');

  await knex('products').insert([
    {
      supplier_id: supplierIds[0],
      category_id: categoryIds[0],
      name: 'Obolon Magnat',
      price: 2.79,
      volume: 500,
      degree: 5.2,
      units_in_stock: 212,
      discount: 0.0,
      description:
        'A glass of Magnat beer is sure to give an atmosphere of exquisteness to any occasion. Before serving a bottle of Magnat, it has to be chilled till the word Obolon becomes visible on the bottle label.',
    },
    {
      supplier_id: supplierIds[1],
      category_id: categoryIds[1],
      name: 'Nemiroff Honey Pepper Vodka',
      price: 18.99,
      volume: 750,
      degree: 40,
      units_in_stock: 123,
      discount: 0.0,
      description:
        'Nemiroff Ukrainian Honey Pepper is a liqueur made to a 600-year-old Ukrainian recipe. It has a balanced mixture of herbs, natural honey, and chili pepper. The piquancy of the drink favorably contrasts with soft honey accents, creating an explosive wave of rich flavor from the first sip and leaving a soft tender aftertaste.',
    },
    {
      supplier_id: supplierIds[2],
      category_id: categoryIds[1],
      name: 'Luc Belaire Luxe French Rosé',
      price: 32.99,
      volume: 750.0,
      degree: 12.5,
      units_in_stock: 12,
      discount: 0.1,
      description:
        'An ideal complement to the rest of the Belaire range, Luxe Rosé is made with a perfectly-balanced blend of Syrah, Grenache, and Cinsault from France’s best terroir and crafted by hand at our historic estate on the beautiful French Riviera. ',
    },
    {
      supplier_id: supplierIds[3],
      category_id: categoryIds[2],
      name: "Dewar's Signature",
      price: 197.51,
      volume: 750.0,
      degree: 40,
      units_in_stock: 3,
      discount: 0.0,
      description:
        'Deep golden amber. Rich, fruity and mellow with notes of rich fruits and honey with vanilla and toffee overtones. ',
    },
    {
      supplier_id: supplierIds[4],
      category_id: categoryIds[0],
      name: 'Lagunitas DayTime IPA',
      price: 2.3,
      volume: 500.0,
      degree: 4,
      units_in_stock: 323,
      discount: 0.1,
      description:
        '98 calories. 4% ABV. Built for the Day. Light in the things that weigh you down, yet crisp & hop-forward.',
    },
    {
      supplier_id: supplierIds[5],
      category_id: categoryIds[2],
      name: 'Montelobos Tobala Mezcal',
      price: 105.13,
      volume: 750.0,
      degree: 46.9,
      units_in_stock: 23,
      discount: 0.1,
      description:
        'Born from centuries of mezcalero craft and enlightened by the methodical pursuit of perfection, Montelobos Tobala is an unaged joven mezcal, crafted from meticulously cultivated agave, which is roasted underground, wild fermented and small batch.',
    },
  ]);
}
