//state argument is not application state, but the state
//this reducer is responsible for
export default function (state = null, action){
  switch(action.type) {
    case 'CAMPAIGN_SELECTED':
      return action.payload;
  }

  return state;
}
