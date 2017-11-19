import * as types from './actionTypes.js';
import endpoints from '../../core/endpoints';
import axios from 'axios';

function getContactsSuccess(data) {
	return {
		type: types.GET_CONTACT_LIST_SUCCESS,
		action: {
			list: data.data,
			errorMessage: null
		}
	};
}

function getContactsFailure(error) {
	return {
		type: types.GET_CONTACT_LIST_FAILURE,
		action: {
			list: [],
			errorMessage: error.message
		}
	};
}

export function getContacts() {
	return dispatch => {
		dispatch({
			type: types.GET_CONTACT_LIST_REQUEST,
			action: {
				list: [],
				errorMessage: null
			}
		});

		const request = {
			url: endpoints['contactsList'].url,
			method: endpoints['contactsList'].method,
			data: data
		};

		axios(request)
			.then(response => {
				const userData = {
					username: username
				};

				dispatch(getContactsSuccess(userData));
			}).catch(error => {
				console.log('Error logging in: ', error);
				dispatch(getContactsFailure(error));
			});
	};
}

export function clearCurrentContact() {
	return {
		type: types.CLEAR_CONTACT,
		action: {
			current: null,
			errorMessage: null
		}
	}
}

function getSingleContactSuccess(data) {
	return {
		type: types.GET_CONTACT_SUCCESS,
		action: {
			current: data.data
		}
	};
}

function getSingleContactFailure(error) {
	return {
		type: types.GET_CONTACT_FAILURE,
		action: {}
	};
}

export function getSingleContact(id) {
	return dispatch => {
		dispatch({
			type: types.GET_CONTACT_REQUEST,
			action: {}
		});

		const request = {
			url: endpoints['singleContact'].url.replace(':id', id),
			method: endpoints['singleContact'].method,
			data: data
		};

		axios(request)
			.then(response => {
				const userData = {
					username: username
				};

				dispatch(getSingleContactSuccess(userData));
			}).catch(error => {
				console.log('Error logging in: ', error);
				dispatch(getSingleContactFailure(error));
			});
	};
}

function postContactSuccess(data) {
	return {
		type: types.POST_CONTACT_SUCCESS,
		action: {}
	};
}

function postContactFailure(error) {
	return {
		type: types.POST_CONTACT_FAILURE,
		action: {}
	};
}

export function postContact(data) {
	console.log('postContact', data);
	return dispatch => {
		dispatch({
			type: types.POST_CONTACT_REQUEST,
			action: {}
		});

		let data = new FormData();
		data.append('data', data);

		const request = {
			url: endpoints['postContact'].url,
			method: endpoints['postContact'].method,
			data: data
		};

		axios(request)
			.then(response => {
				const userData = {
					username: username
				};

				dispatch(postContactSuccess(userData));
			}).catch(error => {
				console.log('Error logging in: ', error);
				dispatch(postContactFailure(error));
			});
	};
}

function getStatsSuccess(data) {
	return {
		type: types.GET_STATS_SUCCESS,
		action: {}
	};
}

function getStatsFailure(error) {
	return {
		type: types.GET_STATS_FAILURE,
		action: {}
	};
}

export function getStats() {
	return dispatch => {
		dispatch({
			type: types.GET_STATS_REQUEST,
			action: {}
		});

		const request = {
			url: endpoints['getStats'].url,
			method: endpoints['getStats'].method,
			data: data
		};

		axios(request)
			.then(response => {
				const userData = {
					username: username
				};

				dispatch(getStatsSuccess(userData));
			}).catch(error => {
				console.log('Error logging in: ', error);
				dispatch(getStatsFailure(error));
			});
	};
}