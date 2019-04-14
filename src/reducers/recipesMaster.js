const initialState = {
  loading: false,
  recipes: [
  {
    image_url: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
    recipe_name: 'Simple Chicken Quesadillas',
  },
  {
    image_url: 'https://static01.nyt.com/images/2016/08/15/dining/15COOKING-PASTA/15COOKING-PASTA-threeByTwoMediumAt2X-v2.jpg',
    recipe_name: 'Sun-Dried Tomato Spaghetti',
  },
  {
    image_url: 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/2048x1024/landscape-1520956952-chicken-tacos-horizontal.jpg?resize=1200:*',
    recipe_name: 'Chicken Advocado Taco',
  },
  {
    image_url: 'https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/honey-walnut-shrimp-asian-slaw-su.jpg?itok=EhpdlTZC',
    recipe_name: 'Honey Walnut Shrimp',
  },
  {
    image_url: 'https://www.simplyrecipes.com/wp-content/uploads/2016/01/honey-mustard-salmon-horiz-a-1600.jpg',
    recipe_name: 'Oven-Roasted Salmon',
  },
  {
    image_url: 'https://images-gmi-pmc.edge-generalmills.com/6059b986-4800-4508-8546-40cb56e3d815.jpg',
    recipe_name: 'Pork Stuffed Dumplings',
  }
]}

const setAllRecipes = (state, action) => {
  console.log('receiving action!!', action);
  const stateClone = Object.assign({}, state);
  stateClone.recipes = action.recipes;
  // initialState.recipes = stateClone.recipes;
  //   // mutating initial state so that undoable works on the first undo...
  console.log('stateclone', stateClone);
  return stateClone;
};


export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    // case 'EXAMPLE_ACTION_NAME': return actionName(state, action);
    case 'SET_ALL_RECIPES' : return setAllRecipes(state, action);
    default:
      return state;
  }
}
