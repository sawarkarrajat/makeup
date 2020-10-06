export const initialState = {
  brandFiltersArray: [],
  tagFiltersArray: [],
  clearFilter: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BRAND_FILTER":
      return {
        ...state,
        brandFiltersArray: [...state.brandFiltersArray, action.item.label],
      };

    case "REMOVE_FROM_BRAND_FILTER":
      return {
        ...state,
        brandFiltersArray: [
          ...state.brandFiltersArray.filter(
            (element) => element !== action.item.label
          ),
        ],
      };
    case "ADD_TO_TAG_FILTER":
      return {
        ...state,
        tagFiltersArray: [...state.tagFiltersArray, action.item.label],
      };

    case "REMOVE_FROM_TAG_FILTER":
      return {
        ...state,
        tagFiltersArray: [
          ...state.tagFiltersArray.filter(
            (element) => element !== action.item.label
          ),
        ],
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        brandFiltersArray: [],
        tagFiltersArray: [],
        clearFilter: !state.clearFilter,
      };

    default:
      return state;
  }
};

export default reducer;
