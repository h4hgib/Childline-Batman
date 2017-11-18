
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
	singleContact: {
		url: `/contacts/:id`,
		method: 'get',
		params: [
			'id'
		]
	}
};