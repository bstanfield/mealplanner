const initialState = {
  // imgURL: [
  //   {name: budget, url: '../img/Bag of money.png'},
  //   {name: time, url: '../img/Time.png'},
  //   {name: expertise, url: '../img/Star.png'},
  //   {name: ingredients, url: '../img/Folk and spoon.png'},
  //   {name: dietary, url: '../img/Flag.png'},
  // ]
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
