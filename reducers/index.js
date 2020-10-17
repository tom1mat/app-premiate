const reducer = (state = {}, action) => {
  switch (action.type) {
    case "START_SESSION":
      return true;
    case "SET_INITAL_STATE":
      return action.payload;
    default:
      return state;
  }
}

export default reducer;