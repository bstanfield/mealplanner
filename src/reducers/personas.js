const initialState = [
  {
    name: 'granola',
    descriptors: ['All your cookbooks are lined up and spaces labeled']
  },
  {
    name: 'bougie',
    descriptors: ['All your cookbooks are lined up and spaces labeled']
  },
  {
    name: 'picky',
    descriptors: ['All your cookbooks are lined up and spaces labeled']
  },
  {
    name: 'adventurous',
    descriptors: ['All your cookbooks are lined up and spaces labeled', 'Hook em, cowboy!']
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
