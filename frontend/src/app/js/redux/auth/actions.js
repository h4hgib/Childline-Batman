import * as types from './actionTypes.js';
import endpoints from '../../core/endpoints';
import axios from 'axios';
import config from '../../../config.json';

function loginUserSuccess(userData) {
	return {
		type: types.LOGIN_USER_SUCCESS,
		action: {
			token: userData.token,
			userData: userData.userData,
			errorMessage: null
		}
	};
}

function loginUserFailure(err) {
	return {
		type: types.LOGIN_USER_FAILURE,
		action: {
			token: null,
			userData: null,
			errorMessage: err.message
		}
	};
}


export function loginUser(username, password) {
	return dispatch => {
		dispatch({type: types.LOGIN_USER_REQUEST});

		let data = new FormData();
		data.append('username', username);
		data.append('password', password);

		const request = {
			url: endpoints['login'].url,
			method: endpoints['login'].method,
			data: data
		};
		
		if (config.fakeBackend) {
			dispatch({
				type: types.LOGIN_USER_SUCCESS,
				action: {
					token: 'fakeToken',
					userData: {
						username: username
					},
					errorMessage: null
				}
			})
			return;
		}

		axios(request)
			.then(response => {
				const userData = {
					token: response.data.token,
					userData: response.data.userData
				};

				dispatch(loginUserSuccess(userData));
			}).catch(error => {
				console.log('Error logging in: ', error);
				dispatch(loginUserFailure(error));
			});
	};
}

export function logout() {
	return dispatch => {
		dispatch({
			type: types.LOGOUT_USER,
			action: {

			}
		});
	};
}

function createUserFailure(err) {
	return {
		type: types.CREATE_USER_FAILURE,
		action: {
			newUserData: null,
			errorMessage: err.message
		}
	};
}

function createUserSuccess(data) {
	return {
		type: types.CREATE_USER_SUCCESS,
		action: {
			newUserData: data,
			errorMessage: null
		}
	};
}

export function createUser(username, password) {
	return dispatch => {
		dispatch({type: types.CREATE_USER_REQUEST});

		let data = new FormData();
		data.append('username', username);
		data.append('password', password);

		const request = {
			url: endpoints['createUser'].url,
			method: endpoints['createUser'].method,
			data: data
		};

		axios(request)
			.then(response => {
				const userData = {
					username: username
				};

				dispatch(createUserSuccess(userData));
			}).catch(error => {
				console.log('Error logging in: ', error);
				dispatch(createUserFailure(error));
			});
	};
}
