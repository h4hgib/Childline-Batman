import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import contactsReducer from './contacts/reducer';

export default combineReducers({
	tokenReducer: (state = {}, action) => {
		console.log('tr(state: ', state, ', action:', action, ')');
		return state;
	},
	auth: authReducer,
	contacts: contactsReducer
});