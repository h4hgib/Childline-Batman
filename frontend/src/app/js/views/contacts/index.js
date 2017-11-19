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
					<BootstrapTable data={this.props.contacts} striped={true} hover={true}>
						<TableHeaderColumn dataField="_id" isKey={true} hidden/>

						<TableHeaderColumn dataField="timestamp">
							When
						</TableHeaderColumn>
						<TableHeaderColumn dataField="contactMethod">
							How
						</TableHeaderColumn>
						<TableHeaderColumn dataField="category">
							Why
						</TableHeaderColumn>
						<TableHeaderColumn dataField="requestAnonimity">
							Anonymous?
						</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({
	contacts: state.contacts.list
})

export default connect(mapStateToProps)(ContactsView);