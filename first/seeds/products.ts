import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del();

  await knex('products').insert([
    {
      name: 'Bud Light',
      price: 1.1,
      description:
        'Introduced in 1982, Bud Light is a premium light lager with a superior drinkability that has made it the best-selling and most popular beer in the United States.',
    },
    {
      name: 'Michelob Ultra',
      price: 1.75,
      description:
        'Michelob ULTRA is the superior light beer with no artificial colors or flavors. With just 2.6 carbs and 95 calories, you can enjoy the crisp, clean taste of Michelob ULTRA without compromising your active lifestyle.',
    },
    {
      name: 'Stella Artois',
      price: 0.99,
      description:
        'Enjoy 600 years of brewing heritage. True to the time-honored recipe, Stella Artois is crafted with three ingredients–saaz hops, malted barley, and water.',
    },
    {
      name: 'Budweiser',
      price: 1.0,
      description:
        'Budweiser beer is a medium-bodied, American-style lager beer. Brewed with high quality barley malt, a blend of premium hop varieties, fresh rice and filtered water, this American beer is crisp and full of flavor.',
    },
    {
      name: 'Heineken Lager',
      price: 1.69,
      description:
        'Smooth, nicely blended bitterness, clean finish. Wherever you go in the world, it’s always refreshing to see something you recognize. That green bottle, the red star, the smiling ‘e’… like an instant welcome from an old friend. Cold, fresh, high quality Heineken. Enjoyed near and far since 1873.',
    },
    {
      name: 'La Marca Prosecco',
      price: 16.99,
      description:
        'Our delicate La Marca Prosecco has a pale, golden straw color and sparkles with lively effervescence.',
    },
    {
      name: 'Apothic Red',
      price: 11.49,
      description:
        'Apothic Red is the bold and intriguing red blend that launched the Apothic legacy, featuring a mix of merlot, cabernet sauvignon, syrah, and zinfandel wine grapes.',
    },
    {
      name: 'Whispering Angel Rosé',
      price: 23.5,
      description:
        'Whispering Angel is today’s worldwide reference for Provence rosé. Its pale color is pleasing to the eye and draws one in.',
    },
    {
      name: 'Taylor Port',
      price: 7.34,
      description:
        'A rich, fruity taste and smooth finish that is excellent with dessert. It is a moderately sweet, ruby red port and is perfect for evening sipping.',
    },
    {
      name: 'Barefoot Pinot Grigio',
      price: 6.99,
      description:
        'Tart green apple flavors get down with a white peach undertone. Floral blossoms and citrus aromas do the tango. Barefoot’s Pinot Grigio is light-bodied with a bright finish.',
    },
    {
      name: 'Smirnoff No. 21 Vodka',
      price: 18.99,
      description:
        'Whether you sip it on the rocks or with soda and a twist, Smirnoff No. 21 is the perfect addition to a cocktail party. Our award-winning, 80 proof vodka has robust flavor with a dry finish for ultimate smoothness and clarity.',
    },
    {
      name: 'Bulleit Bourbon',
      price: 41.99,
      description:
        'Bulleit Bourbon is inspired by the whiskey that was pioneered by Augustus Bulleit over 150 years ago. Only ingredients of the very highest quality are used.',
    },
    {
      name: 'Ketel One Vodka',
      price: 26.99,
      description:
        'Experience the taste inspired by traditional distilling expertise with Ketel One Family Made Vodka',
    },
    {
      name: 'Jameson Irish Whiskey',
      price: 29.99,
      description:
        'Perhaps the most notable whiskey on earth, Jameson Irish Whiskey is a crisp, sippable drink that has stood the test of time.',
    },
    {
      name: 'Don Julio 1942',
      price: 179.99,
      description:
        'Don Julio 1942 Añejo Tequila is handcrafted in tribute to the year that Don Julio González began his tequila-making journey.',
    },
  ]);
}
