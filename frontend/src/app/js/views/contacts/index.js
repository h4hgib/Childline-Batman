import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import {getContacts} from '../../redux/contacts/actions.js';

class ContactsView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(getContacts());
	}

	render() {
		return (<div>
				<PageHeader>
					List of contacts
				</PageHeader>
				<div>
					{JSON.stringify(this.props.contacts)}
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({
	contacts: state.contacts.list
})

export default connect(mapStateToProps)(ContactsView);