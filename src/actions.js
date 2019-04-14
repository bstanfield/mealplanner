export function SetAllRecipes(recipes) {
  return{
    type: 'SET_ALL_RECIPES',
    recipes,
  };
}

export function SetRecipePage(recipe) {
  return{
    type: 'SET_RECIPE_PAGE',
    recipe,
  };
}


