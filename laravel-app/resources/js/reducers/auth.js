const initialState = {
	'isAuthenticated': false,
	'user': null,
	'todays_note': null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ACCOUNT_CONTEXT':
			return {
				...state,
				'isAuthenticated': true,
				'user': action.data.user,
				'todays_note': action.data.todays_note,
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