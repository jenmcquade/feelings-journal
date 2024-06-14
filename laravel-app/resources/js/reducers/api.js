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
		case 'SUBMIT_FEELINGS':
			return {
				...state,
				'feelings': action.feelings,
			};
		default:
			return state;
	}
};