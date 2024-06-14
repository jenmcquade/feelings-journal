export const setUserContext = (user) => {
	return {
		type: 'SET_ACCOUNT_CONTEXT',
		user
	};
};

export const removeUserContext = () => {
	return {
		type: 'REMOVE_ACCOUNT_CONTEXT',
	};
};