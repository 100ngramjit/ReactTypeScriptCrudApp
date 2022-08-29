const initialState = {
  isLoading: false,
  loaded: false,
  data: "",
  error: "",
};
function blogReducer(state = initialState, action: { type: any; data: any }) {
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
        loaded: false,
        data: "",
        error: action.data,
      };
    default:
      return state;
  }
}

export default blogReducer;
