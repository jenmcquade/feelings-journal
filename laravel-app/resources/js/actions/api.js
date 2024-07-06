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

export const setAllFeelingsContext = (feelings) => {
	return {
		type: 'SET_ALL_FEELINGS_CONTEXT',
		feelings
	};
}