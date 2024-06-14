import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers/auth';
import { apiReducer } from '../reducers/api';

const store = configureStore({
	reducer: {
		auth: authReducer,
		api: apiReducer,
	},
});

export default store;