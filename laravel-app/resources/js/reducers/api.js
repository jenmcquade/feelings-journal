const initialState = {
	'loading': false,
	'allFeelings': [],
	'todaysNote': '',
	'todaysFeelings': [],
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
				'todaysFeelings': action.todaysFeelings,
			};
		case 'SET_ALL_FEELINGS_CONTEXT':
			return {
				...state,
				'allFeelings': action.feelings,
			};
		case 'SET_TODAYS_VALUES_CONTEXT':
			return {
				...state,
				'todaysNote': action.todaysValues?.todays_note ?? '',
				'todaysFeelings': action.todaysValues?.todays_feelings
			};
		default:
			return state;
	}
};