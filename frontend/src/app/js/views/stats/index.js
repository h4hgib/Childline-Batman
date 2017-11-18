import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';

class StatsView extends Component {
	render() {
		return (<div>
				<PageHeader>
					Statistics
				</PageHeader>
				<div>
					Body
				</div>
			</div>);
	}
}

export default StatsView;