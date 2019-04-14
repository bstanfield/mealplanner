// export function ActionName(actionPayload) {
//   return {
//     type: 'EXAMPLE_ACTION_NAME',
//     actionPayload,
//   };
// }

export function SetAllRecipes(recipes) {
  console.log("actions allRecipes", recipes);
  return{
    type: 'SET_ALL_RECIPES',
    recipes,
  };
}

