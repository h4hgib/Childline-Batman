import * as types from './actionTypes.js';
import axios from 'axios';

function getContactsSuccess(data) {
	return {
		type: types.GET_CONTACTS_SUCCESS,
		action: {}
	};
}

function getContactsFailure(error) {
	return {
		type: types.GET_CONTACTS_FAILURE,
		action: {}
	};
}

export function getContacts() {
	return dispatch => {
		dispatch({
			type: types.GET_CONTACTS_REQUEST,
			action: {}
		});
	};
}

function getSingleContactSuccess(data) {
	return {
		type: types.GET_CONTACT_SUCCESS,
		action: {}
	};
}

function getSingleContactFailure(error) {
	return {
		type: types.GET_CONTACT_FAILURE,
		action: {}
	};
}

export function getSingleContact() {
	return dispatch => {
		dispatch({
			type: types.GET_CONTACT_REQUEST,
			action: {}
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
	return dispatch => {
		dispatch({
			type: types.POST_CONTACT_REQUEST,
			action: {}
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
	};
}