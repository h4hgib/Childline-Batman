import endpoints from '../../core/endpoints';

function loginSuccess(userData) {
	return {
		type: types.LOGIN_USER_SUCCESS,
		action: {
			token: userData.token,
			userData: userData.userData
		}
	};
}

function loginFailure(err) {
	return {
		type: types.LOGIN_USER_FAILURE,
		action: {
			token: userData.token,
			userData: userData.userData
		}
	};
}


export function loginUser(username, password) {
	return dispatch => {
		dispatch({type: types.LOGIN_USER_REQUEST});

		const request = {
			url: endpoints['login'].url,
			method: endpoints['login'].method,
			bodyParams: {
				username: userName,
				password: password
			}
		};
		backendProxyInstance.request(request)
			.then(response => {
				const userData = {
					home: userHome,
					token: response.data.data.token,
					userData: response.data.data
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
