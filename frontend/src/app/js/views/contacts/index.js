import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';

class ContactsView extends Component {
	render() {
		return (<div>
				<PageHeader>
					List of contacts
				</PageHeader>
				<div>
					Body
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({
	contacts: state.contacts.contacts
})

export default connect(mapStateToProps)(ContactsView);