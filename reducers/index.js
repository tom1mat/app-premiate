const reducer = (state = {}, action) => {
  console.log('INITIAL STATE: ', state);
  switch (action.type) {
    case "START_SESSION":
      return true;
    default:
      return state;
  }
}

export default reducer;