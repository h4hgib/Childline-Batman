import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form'

import schema from '../../../../schemas/form/common/form.json';
import uiSchema from '../../../../schemas/form/common/form.ui.json';

class CommonDataInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			liveValidate: false
		};

		this.handleInput = _.curry(this.handleInput)(this);
		this.handleOnError = this.handleOnError.bind(this);
	}

	handleInput(component, field, e) {
		const newState = {};
		newState[field] = e.target.value;
		component.setState(newState);
	}

	handleOnError(errors) {
		if (errors) {
			this.setState({
				liveValidate: true
			});
		}
	}

	render() {
		return (<div>
			<Form
				schema={schema}
				uiSchema={uiSchema}
				onChange={({formData}) => this.props.handleInput(formData)}
				formData={this.props.value}
				onSubmit={this.props.onSubmit}
				onError={this.handleOnError}
				liveValidate={this.state.liveValidate}
			/>
		</div>);
	}
}

CommonDataInput.propTypes = {
	handleInput: PropTypes.func.isRequired,
	value: PropTypes.object
}

export default CommonDataInput;