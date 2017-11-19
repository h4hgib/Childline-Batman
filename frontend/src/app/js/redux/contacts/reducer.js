import * as types from './actionTypes.js';

const initialState = {
	current: {},
	list: [],
	stats: []
};

const contactsReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.GET_CONTACT_LIST_FAILURE:
		case types.GET_CONTACT_LIST_REQUEST:
		case types.GET_CONTACT_LIST_SUCCESS:
			return Object.assign({}, state, {
				list: action.action.list,
				errorMessage: action.action.errorMessage
			});
			break;

		case types.GET_CONTACT_FAILURE:
		case types.GET_CONTACT_REQUEST:
		case types.GET_CONTACT_SUCCESS:
		case types.POST_CONTACT_FAILURE:
		case types.POST_CONTACT_REQUEST:
		case types.POST_CONTACT_SUCCESS:
		case types.CLEAR_CONTACT:
			return Object.assign({}, state, {
				current: action.action.current,
				errorMessage: action.action.errorMessage
			});
			break;
		case types.GET_STATS_FAILURE:
		case types.GET_STATS_REQUEST:
		case types.GET_STATS_SUCCESS:
			return Object.assign({}, state, {
				stats: action.action.stats,
				errorMessage: action.action.errorMessage
			});
			break;
	}
	return state;
};

export default contactsReducer;