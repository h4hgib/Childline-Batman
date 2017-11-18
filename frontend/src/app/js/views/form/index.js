import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';

class FormView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>
				<PageHeader>
					Register contact
				</PageHeader>
				<div>
					Body
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(FormView);