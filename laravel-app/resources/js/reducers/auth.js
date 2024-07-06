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
				'user': action.data.user,
			};
		case 'REMOVE_ACCOUNT_CONTEXT':
			return {
				...state,
				'isAuthenticated': false,
				'user': null,
			};
		default:
			return state;
	}
};