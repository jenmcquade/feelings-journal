export const setLoadingContext = (loading) => {
	return {
		type: 'SET_LOADING_CONTEXT',
		loading
	};
}

export const submitFeelings = (feelings) => {
	return {
		type: 'SUBMIT_FEELINGS',
		feelings
	};
}