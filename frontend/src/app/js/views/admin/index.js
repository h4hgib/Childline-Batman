import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';

class AdminView extends Component {
	render() {
		return ((<div>
				<PageHeader>
					Administration
				</PageHeader>
				<div>
					Body
				</div>
			</div>);
	}
}

export default AdminView;