import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import {getContacts} from '../../redux/contacts/actions.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router-dom';
import moment from 'moment';

const dateFormatter = (cell) => {
	const time = moment(cell);
	return time.format();
};

const goToFormFormatter = (cell, row) => {
	return (<Link to={`/form/${row.id}`}>Go to form</Link>);
};

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
					<BootstrapTable data={this.props.contacts} striped={true} hover={true}>
						<TableHeaderColumn dataField="id" isKey={true} hidden/>
						<TableHeaderColumn dataField="timestamp" dataFormat={dateFormatter}>
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
						<TableHeaderColumn dataField="none" dataFormat={goToFormFormatter}>
							Go to Form
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