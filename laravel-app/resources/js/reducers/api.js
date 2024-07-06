const initialState = {
	'loading': false,
};

export const apiReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_LOADING_CONTEXT':
			return {
				...state,
				'loading': action.loading,
			};
		case 'SET_FEELINGS':
			return {
				...state,
				'feelings': action.feelings,
			};
		case 'SET_ALL_FEELINGS_CONTEXT':
			return {
				...state,
				'allFeelings': action.feelings,
			};
		default:
			return state;
	}
};