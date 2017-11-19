import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import Form from 'react-jsonschema-form';
import _ from 'lodash';

import {createUser} from '../../redux/auth/actions.js';
import userSchema from '../../schemas/user/user.json';
import userUiSchema from '../../schemas/user/user.ui.json';

function validate({ password, repeatPassword }, errors) {
  if (password !== repeatPassword) {
    errors.repeatPassword.addError("Passwords don't match.");
  }
  return errors;
}

function handleInput(component, field, transform, e) {
	const newState = {};
	newState[field] = transform(e);
	component.setState(newState);
}

class AdminView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userCreationData: {}
		};

		this.handleInput = _.curry(handleInput)(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnSubmit({formData}) {
		this.props.dispatch(createUser(formData.username, formData.password));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.newUserData !== nextProps.newUserData && nextProps.newUserData) {
			this.setState({
				userCreationData: {}
			});
		}
	}

	render() {
		return (<div>
				<PageHeader>
					Administration
				</PageHeader>
				<div>
					{this.props.userCreationData && 
						(<div>User {this.props.userCreationData.username} create</div>)}
					{this.props.errorMessage && 
						<div>{this.props.errorMessage}</div>}
					<Form
						schema={userSchema}
						uiSchema={userUiSchema}
						formData={this.state.userCreationData}
						onChange={this.handleInput('userCreationData')(({formData}) => formData)}
						onSubmit={this.handleOnSubmit}
						liveValidate
					/>
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({
	newUserData: state.auth.newUserData,
	errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps)(AdminView);