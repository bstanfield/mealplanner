const initialState = {
  slide: [
    {
      imageURL: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
      recipeName: 'Simple Chicken Quesadillas',
      recipeLink: ''
    },
    {
      imageURL: 'https://static01.nyt.com/images/2016/08/15/dining/15COOKING-PASTA/15COOKING-PASTA-threeByTwoMediumAt2X-v2.jpg',
      recipeName: 'Sun-Dried Tomato Spaghetti',
      recipeLink: ''
    },
    {
      imageURL: 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/2048x1024/landscape-1520956952-chicken-tacos-horizontal.jpg?resize=1200:*',
      recipeName: 'Chicken Advocado Taco',
      recipeLink: ''
    },
    {
      imageURL: 'https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/honey-walnut-shrimp-asian-slaw-su.jpg?itok=EhpdlTZC',
      recipeName: 'Honey Walnut Shrimp',
      recipeLink: ''
    },
    {
      imageURL: 'https://www.simplyrecipes.com/wp-content/uploads/2016/01/honey-mustard-salmon-horiz-a-1600.jpg',
      recipeName: 'Oven-Roasted Salmon',
      recipeLink: ''
    },
    {
      imageURL: 'https://images-gmi-pmc.edge-generalmills.com/6059b986-4800-4508-8546-40cb56e3d815.jpg',
      recipeName: 'Pork Stuffed Dumplings',
      recipeLink: ''
    }
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
