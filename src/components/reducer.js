export const initialState = {
  brandFiltersArray: [],
  tagFiltersArray: [],
  clearFilter: false,
  priceMin: null,
  priceMax: null,
  rating: null,
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
    case "ADD_PRICE_RANGE":
      return {
        ...state,
        priceMin: action.item.min,
        priceMax: action.item.max,
      };
    case "UPDATE_RATING":
      return {
        ...state,
        rating: action.item,
      };
    case "CLEAR_FILTER":
      return {
        brandFiltersArray: [],
        tagFiltersArray: [],
        priceMin: null,
        priceMax: null,
        clearFilter: !state.clearFilter,
      };

    default:
      return state;
  }
};

export default reducer;
