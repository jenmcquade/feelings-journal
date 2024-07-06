export const setUserContext = (data) => {
	return {
		type: 'SET_ACCOUNT_CONTEXT',
		data
	};
};

export const removeUserContext = () => {
	return {
		type: 'REMOVE_ACCOUNT_CONTEXT',
	};
};