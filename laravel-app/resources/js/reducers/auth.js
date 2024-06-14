const initialState = {
	'isAuthenticated': false,
	'user': null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ACCOUNT_CONTEXT':
			return {
				...state,
				'isAuthenticated': true,
				'user': action.user,
			};
		case 'REMOVE_ACCOUNT_CONTEXT':
			return {
				...state,
				'isAuthenticated': false,
				'user': null,
			};
		case 'SET_LOADING_CONTEXT':
			return {
				...state,
				'loading': action.loading,
			};
		default:
			return state;
	}
};