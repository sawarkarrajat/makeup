export const initialState = {
	filtersArray: [],
};

const reducer = (state, action) => {
	console.log(state);
	switch (action.type) {
		case "ADD_TO_FILTER":
			return {
				...state,
				filtersArray: [...state.filtersArray, action.item.label],
			};

		case "REMOVE_FROM_FILTER":
			return {
				...state,
				filtersArray: [
					...state.filtersArray.filter(
						(element) => element !== action.item.label
					),
				],
			};

		default:
			return state;
	}
};

export default reducer;
