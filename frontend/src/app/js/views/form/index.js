import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';

class FormView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>
				Form
			</div>);
	}
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(FormView);