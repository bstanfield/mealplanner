const initialState = [
  {
    persona: 'granola',
    chars: ['All your cookbooks are lined up and spaces labeled', 'Your kitchen counter is a battleground for new dishes and fusions, because you are always experimenting with the food you cook.']
  },
  {
    persona: 'bougie',
    chars: ['You love to have the best ingredients and most complicated rcipes, even if it means sinking more time and money into it', 'At the end of the day, you want to truly do justice to every culinary style']
  },

];

// const setPersonas = (state, action) => {
//   return action.personas;
// };

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'SET_PERSONAS': return action.personas;
    default:
      return state;
  }
}
