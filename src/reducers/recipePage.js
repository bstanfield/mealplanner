const initialState = {
  recipeMeta: {
    name: 'Simple Chicken Quesadillas',
    heroImage: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
    times: {
      total: '40',
      prep: '20',
      cook: '80',
    },
    cost: '$',
    level: 'easy',
  },
  recipeIngredients: [
    { count: 6, name: 'large tortillas' },
    { count: 1, name: 'pound chicken breast' },
    { count: 1, name: 'large onion' },
    { count: 1, name: 'red bell pepper' },
  ],
  recipeInstructions: [
    'Heat 1 tablespoon of olive oil in a skillet over high heat. Sprinkle the chicken with salt, pepper, and taco seasoning.',
    'Add the chicken to the skillet and saute over medium-high heat until done, about 4 minutes per side. Remove from the skillet and dice into cubes. Set aside.',
    'Add the remaining 1 tablespoon of olive oil to the skillet over high heat. Throw in the onions and pepers and cook until the peppers have a few dark brown/black areas, 3 to 4 minutes. Remove and set aside.'
  ],
  recipeTips: [
    { name: 'Storage', tip: `<ul><li>Store in airtight container for up to 4 days</li><li>Store in freezer, wrapped in foil for up to 2 weeks</li></ul>` },
    { name: 'To reheat', tip: `<ul><li>Microwave on high for 1 minute OR heat on a skillet for about 1 minute each side, until golden brown</li><li>Let sit for 30 seconds</li></ul>` }
  ]
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    // case 'EXAMPLE_ACTION_NAME': return actionName(state, action);
    default:
      return state;
  }
}
