import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del();

  await knex('products').insert([
    {
      name: 'Sierra Nevada Pale Ale',
      price: 1.99,
      description:
        'Pale Ale sparked the American craft beer revolution. Bold and complex with pine and citrus notes from whole-cone Cascade hops.',
    },
    {
      name: 'Yuengling Traditional Lager',
      price: 2.49,
      description:
        'Yuengling Lager is an iconic American lager famous for its rich amber color and medium-bodied flavor. Roasted caramel malt adds subtle sweetness, while a combination of cluster and cascade hops round out this well-balanced beer. Drink this classic lager chilled, either in a beer mug or straight from the bottle.',
    },
    {
      name: 'Lagunitas Maximus',
      price: 8.99,
      description:
        "Kinda like our IPA on steroids… Flavor so hoppy it threatens to remove the enamel from one's teeth.",
    },
    {
      name: 'Corona Hard Seltzer Gluten',
      price: 10.99,
      description:
        "A tasty spiked seltzer water with a splash of natural flavor, Corona Hard Seltzer is a zero carb, alcoholic seltzer water with Corona's chill attitude and premium quality",
    },
    {
      name: 'Corona Light Mexican Lager Light Beer',
      price: 3.38,
      description:
        'Corona Premier Mexican Lager Beer is the light beer experience you desire, offering an exceptionally smooth taste with fewer calories than both Corona Extra and Corona Light',
    },
    {
      name: 'Matua Marlborough Sauvignon Blanc',
      price: 12.09,
      description:
        'Perfect for a fun, uplifting get-together. Explore the pioneer in New Zealand Sauvignon Blanc,a balanced mouthfeel packed with crisp citrus notes and a hint of vibrant passionfruit and basil.',
    },
    {
      name: '19 Crimes Snoop Cali Rosé',
      price: 12.99,
      description:
        'Ripe strawberry notes along with delicate floral and rose petal aromas. Fruit-forward notes of fresh raspberry, strawberry, and red cherry. Pleasant mouthfeel with balanced acidity and sweetness.',
    },
    {
      name: 'La Crema Sonoma Coast Chardonnay',
      price: 19.99,
      description:
        "A round, light, and balanced Chardonnay from Califorina's cool Sonoma Coast. Apricot, lemon, Gala apple, subtle oak and spice aromas. Lemon drop, white stonefruit yellow plum and honeydew melon on the palate. Richly textured and concentrated with balanced acidity that drives a lingering finish.",
    },
    {
      name: 'Veuve Clicquot Brut Yellow Label Champagne',
      price: 60.0,
      description:
        'Veuve Clicquot Yellow Label is the signature champagne of the House. Dominated by Pinot Noir, it offers a perfect balance of structure and finesse.',
    },
    {
      name: 'Carpano Antica Formula Vermouth',
      price: 36.99,
      description:
        "Carpano's Antica Formula, from the original recipe developed by Antonio Benedetto Carpano in 1786, is a sweet vermouth of the highest quality.",
    },
    {
      name: 'Ketel One Vodka',
      price: 26.99,
      description:
        'Experience the taste inspired by traditional distilling expertise with Ketel One Family Made Vodka. Our 80 proofvodka is carefully crafted using exclusively 100% non-GMO European wheat for smoothness and neutrality.',
    },
    {
      name: 'Captain Morgan Original Spiced Rum',
      price: 25.19,
      description:
        'Captain Morgan is the original party spirit, a spiced rum that was born and blended to have agood time. So grab a bottle of Captain Morgan Spiced Rum, raise a leg, and toast to the adventure to be had. Captain’s orders!',
    },
    {
      name: "Jack Daniel's Tennessee Honey",
      price: 37.99,
      description:
        'Jack Daniel’s Tennessee Honey is a blend of Jack Daniel’s Tennessee Whiskey and a unique honey liqueur of our own making, for a taste that’s one-of-a-kind and unmistakably Jack. With hints of honey and a finish that’s naturally smooth, Jack Daniel’s Tennessee Honey is something special.',
    },
    {
      name: 'Jameson Black Barrel',
      price: 49.49,
      description:
        'A bright amber hue in the glass, Jameson Black Barrel offers butterscotch and maple notes in the perfume. Flavors of green apple, butterscotch and mineral are evoked on the palate, with a salt caramel finish.',
    },
    {
      name: 'Fireball Cinnamon Whisky',
      price: 21.46,
      description:
        'Fireball Cinnamon Whisky needs no introduction. Just imagine what it feels like to stand face-to-face with a fire-breathing dragon who just ate a whisky barrel full of spicy cinnamon. Tastes like heaven, burns like hell. What happens next is up to you.',
    },
  ]);
}
