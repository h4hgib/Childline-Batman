import * as types from './actionTypes.js';

const initialState = {
	isAuthenticated: false,
	isAuthenticating: false,
	token: null,
	userData: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGOUT_USER:
			return Object.assign({}, state, {
				isAuthenticated: false,
				isAuthenticating: false,
				token: null,
				userData: null
			});

		case types.LOGIN_USER_FAILURE:
			return Object.assign({}, state, {
				isAuthenticated: false,
				isAuthenticating: false,
				token: null,
				userData: null
			});

		case types.LOGIN_USER_REQUEST:
			return Object.assign({}, state, {
				isAuthenticating: true,
				isAuthenticated: false,
				token: null,
				userData: null
			});

		case types.LOGIN_USER_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: true,
				isAuthenticating: false,
				token: action.action.token,
				userData: action.action.userData
			});
	}
	return state;
};

export default authReducer;
