import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';

class StatsView extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.submitForm = this.submitForm.bind(this);
	}

	handleInput(component, field, e) {
		const newState = {};
		newState[field] = e.target.value;
		component.setState(newState);
	}

	submitForm(e) {
		e;
	}

	render() {
		// The d3 Component hasn't been updated to React 16, so we just cut this off
		return (<div>
				<PageHeader>
					Statistics
				</PageHeader>
				<div>
					Here be stats
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(StatsView);