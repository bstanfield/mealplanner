export function SetAllRecipes(recipes) {
  return{
    type: 'SET_ALL_RECIPES',
    recipes,
  };
}

export function SetPersonas(personas) {
  console.log('personas action', personas);
  return{
    type: 'SET_PERSONAS',
    personas,
  };
}

export function SetRecipePage(recipe) {
  return{
    type: 'SET_RECIPE_PAGE',
    recipe,
  };
}


export function SetUpvotes(upvotes) {
  console.log('upvotes action', upvotes);
  return{
    type: 'SET_UPVOTES',
    upvotes,
  };
}

export function SetRecipeIngredients(ingredients) {
  return{
    type: 'SET_RECIPE_INGREDIENTS',
    ingredients,
  };
}
