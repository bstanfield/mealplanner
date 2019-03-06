const initialState = [
  {
    name: 'granola',
    descriptors: ['All your cookbooks are lined up and spaces labeled', 'Your kitchen counter is a battleground for new dishes and fusions, because you are always experimenting with the food you cook.']
  },
  {
    name: 'bougie',
    descriptors: ['You love to have the best ingredients and most complicated rcipes, even if it means sinking more time and money into it', 'At the end of the day, you want to truly do justice to every culinary style']
  },
  {
    name: 'picky',
    descriptors: ['You might not like a particular condiment and want ingredients only in specified ratio and proportion', 'You are meticulous, know what you like, and stick to it']
  },
  {
    name: 'adventurous',
    descriptors: ['You believe that the edge of your comfort zone is where the magic happens', 'You may not be great at cooking, but you always like trying new things']
  },
];

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
