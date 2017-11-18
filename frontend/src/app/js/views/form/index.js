import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import _ from 'lodash';
import {postContact} from '../../redux/contacts/actions.js';
import CommonDataInput from './subcomponents/commonDataInput';

const handleInput = (component, field, value) => {
	console.log('handleInput', component, field, value);
	const newState = {};
	newState[field] = value;
	component.setState(newState);
	
};

class FormView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timestamp: new Date()
		};

		this.handleInput = _.curry(handleInput)(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	

	handleSubmit(e) {
		this.props.dispatch(postContact(this.state));
	}

	render() {
		return (<div>
				<PageHeader>
					Register contact
				</PageHeader>
				<div>
					<CommonDataInput
						handleInput={this.handleInput}
						timestamp={this.state.timestamp}
						category={this.state.category}
						requestAnonimity={this.state.requestAnonimity}
						contactMethod={this.state.contactMethod}
					/>
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(FormView);