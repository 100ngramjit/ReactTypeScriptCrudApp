const initialState = {
  isLoading: false,
  loaded: false,
  data: "",
  error: "",
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        loaded: false,
        data: "",
        error: "",
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.data,
        error: "",
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: "",
        error: action.data,
      };
    default:
      return state;
  }
}

export default reducer;
