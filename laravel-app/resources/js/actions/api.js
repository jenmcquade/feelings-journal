export const setLoadingContext = (loading) => {
	return {
		type: 'SET_LOADING_CONTEXT',
		loading
	};
}

export const setFeelings = (feelings) => {
	return {
		type: 'SET_FEELINGS',
		feelings
	};
}

export const setTodaysValuesContext = (todaysValues) => {
	return {
		type: 'SET_TODAYS_VALUES_CONTEXT',
		todaysValues
	};
}

export const setAllFeelingsContext = (feelings) => {
	return {
		type: 'SET_ALL_FEELINGS_CONTEXT',
		feelings
	};
}