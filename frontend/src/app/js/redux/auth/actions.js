import * as types from './actionTypes.js';
import endpoints from '../../core/endpoints';
import axios from 'axios';

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
