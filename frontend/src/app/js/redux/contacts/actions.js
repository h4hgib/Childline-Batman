import * as types from './actionTypes.js';
import endpoints from '../../core/endpoints';
import axios from 'axios';
import config from '../../../config.json';
import _ from 'lodash';

const list = [{
						id: 1,
						timestamp: 1511013857000,
						contactMethod: "phone",
						category: "Request for Information",
						requestAnonimity: "YES",
						sex: "M",
						age: 12,
						primaryReason: "Neglect",
						secondaryReason: []
					},
					{
						id: 2,
						timestamp: 1511013857000,
						contactMethod: "chat",
						category: "Diverse",
						requestAnonimity: "NO",
						option: "Silent call"
					},
					{
						id: 3,
						timestamp: 1511013857000,
						contactMethod: "email",
						category: "Referral",
						requestAnonimity: "?",
						sex: "F",
						age: 15,
						primaryReason: "Bullying",
						secondaryReason: ["Suicide", "Teen Pregnancy"]
					},
					{
						id: 4,
						timestamp: 1511013857000,
						contactMethod: "chat",
						category: "Appropiate Adult",
						requestAnonimity: "NO"
					}];

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
			method: endpoints['contactsList'].method
		};

		if (config.fakeBackend) {
			dispatch({
				type: types.GET_CONTACT_LIST_SUCCESS,
				action: {
					list: list,
					errorMessage: null
				}
			})
			return;
		}

		axios(request)
			.then(response => {
				dispatch(getContactsSuccess(response));
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
			method: endpoints['singleContact'].method
		};


		if (config.fakeBackend) {
			dispatch({
				type: types.GET_CONTACT_SUCCESS,
				action: {
					current: _.find(list, (item) => {
						return item.id === parseInt(id);
					}),
					errorMessage: null
				}
			})
			return;
		}

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
			method: endpoints['getStats'].method
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