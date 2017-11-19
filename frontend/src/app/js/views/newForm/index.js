import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import _ from 'lodash';
import {postContact, clearCurrentContact} from '../../redux/contacts/actions.js';
import CommonDataInput from './subcomponents/commonDataInput';

const handleInput = (component, field, value) => {
	const newState = {};
	newState[field] = value;
	component.setState(newState);
};

class NewFormView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {

			}
		};

		this.handleInput = _.curry(handleInput)(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(clearCurrentContact());
	}

	handleSubmit(e) {
		const transformFormData = (formData) => {
			const clonedFormData = _.cloneDeep(formData);
			clonedFormData.timestamp = new Date(formData.timestamp).getTime();
			return clonedFormData;
		}
		this.props.dispatch(postContact(transformFormData(this.state.formData)));
	}

	render() {
		return (<div>
				<PageHeader>
					Register contact
				</PageHeader>
				<div>
					<CommonDataInput
						handleInput={this.handleInput('formData')}
						value={this.state.formData}
						onSubmit={this.handleSubmit}
					/>
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(NewFormView);