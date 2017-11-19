
export default {
	login: {
		url: `/auth/login`,
		method: 'post',
		payload: [
			'username',
			'password'
		]
	},
	logout: {
		url: `/auth/logout`,
		method: 'logout'
	},
	contactsList: {
		url: `/contacts`,
		method: 'get'
	},
	postContact: {
		url: `/contacts`,
		method: 'post',
		payload: [
			'TBD'
		]
	},
	updateContact: {
		url: `/contacts/:id`,
		method: 'post',
		payload: [
			'TBD'
		]
	},
	singleContact: {
		url: `/contacts/:id`,
		method: 'get',
		params: [
			'id'
		]
	},
	createUser: {
		url: `/auth/register`,
		method: 'post',
		params: [
			'username',
			'password'
		]
	},
	getStats: {
		url: `/stats`,
		method: 'get'
	}
};