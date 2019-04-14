const initialState = {recipePage: {
  recipeMeta: {
    name: 'Simple Chicken Quesadillas',
    heroImage: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
    times: {
      total: '40 min',
      prep: '20 min',
      cook: '80 min',
    },
    cost: '$',
    level: 'Easy',
  },
  recipe_ingredients: [
    { count: 6, name: 'large tortillas' },
    { count: 1, name: 'pound chicken breast' },
    { count: 1, name: 'large onion' },
    { count: 1, name: 'red bell pepper' },
    { count: 2, name: 'cloves of garlic' },
    { count: 2, name: 'tablespoons of olive oil' },
    { count: 2, name: 'cups of grated cheese' },
    { count: 1, name: 'teaspoon of salt & pepper' },
    { count: 1, name: 'cup of salsa of your choice' },
  ],
  recipe_instructions: [
    'Heat 1 tablespoon of olive oil in a skillet over high heat. Sprinkle the chicken with salt, pepper, and taco seasoning.',
    'Add the chicken to the skillet and saute over medium-high heat until done, about 4 minutes per side. Remove from the skillet and dice into cubes. Set aside.',
    'Add the remaining 1 tablespoon of olive oil to the skillet over high heat. Throw in the onions and pepers and cook until the peppers have a few dark brown/black areas, 3 to 4 minutes. Remove and set aside.',
    'Sizzle olive oil in a separate skillet or griddle over medium heat and lay a flour tortilla in the skillet. Then build the quesadillas by laying grated cheese on the bottom tortilla, and then arranging the chicken and cooked peppers. Top with a little more grated cheese and top with a second tortilla.',
    'When the tortilla is golden on the first side, carefully flip the quesadilla to the other side, adding more olive oil to the skillet at the same time. Continue cooking until the second side is golden. Repeat with the remaining tortillas and fillings.',
    'Cut each quesadilla into wedges and serve with desired toppings (salsa, sour cream, lime).'
  ],
  recipe_tips: [
    { name: 'Storage', tip: `<ul><li>Store in airtight container for up to 4 days</li><li>Store in freezer, wrapped in foil for up to 2 weeks</li></ul>` },
    { name: 'To reheat', tip: `<ul><li>Microwave on high for 1 minute OR heat on a skillet for about 1 minute each side, until golden brown</li><li>Let sit for 30 seconds</li></ul>` }
  ]
}
};

const setRecipePage = (state, action) => {
  // const stateClone = Object.assign(...state, action.recipe);
  const stateClone = Object.assign({}, state);
  stateClone.recipePage = action.recipe[0];
  // only pulls first item from array when the fetch request returns just one recipe
  console.log("stateClone", stateClone);
  return stateClone;
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    // case 'EXAMPLE_ACTION_NAME': return actionName(state, action);
    case 'SET_RECIPE_PAGE' : return setRecipePage(state, action);
    default:
      return state;
  }
}
