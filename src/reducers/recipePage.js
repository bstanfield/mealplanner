const initialState = {
  recipePage: {
    cooktime: 20,
    cost: 6,
    id: 2,
    image_url: "https://skinnyfitalicious.com/wp-content/uploads/2016/12/one-pan-shrimp-brussels-sprouts-img8.jpg",
    instructions: ["Preheat oven to 350 F. Prepare a nonstick baking sheet or cover with parchment paper.","In a small bowl, combine lemon juice, extra virgin olive oil, garlic and pepper flakes, salt, pepper and parsley, toss shrimp in the marinade. Let it sit 20 minutes to marry the flavors.","Place the shrimp on the prepared baking sheet in the center.", "Surround the shrimp with the sliced brussels sprouts and sprinkle with garlic powder, salt and pepper.", "Bake in oven at 350 F for 20 minutes until shrimp is pink.", "Remove from the oven, serve with fresh lemon slices."],
    level: "beginner",
    persona: "bougie",
    preptime: 10,
    recipe_name: "One-pan Lemon Garlic Shrimp and Brussels Sprouts",
    reheat: ["Microwave for 1 minute in microwave-safe container and serve with fresh lemon slices"],
    storage: ["Refrigerate in airtight container up to 3-4 days."],
    upvotes:1,
    },
  ingredients:[],
};

const setRecipePage = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.recipePage = action.recipe[0];
  // Only pulls first item from array when the fetch request returns just one recipe
  return stateClone;
};

const setUpvotes = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.recipePage.upvotes = action.upvotes;
  return stateClone;
}

const setRecipeIngredients = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.ingredients=action.ingredients;
  return stateClone;
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'SET_RECIPE_PAGE' : return setRecipePage(state, action);
    case 'SET_UPVOTES' : return setUpvotes(state, action);
    case 'SET_RECIPE_INGREDIENTS' : return setRecipeIngredients(state, action);
    default:
      return state;
  }
}
