import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ContactsView extends Component {
	render() {
		return (<div>BLAH</div>);
	}
}

const mapStateToProps = (state) => ({
	contacts: state.contacts.contacts
})

export default connect(mapStateToProps)(ContactsView);