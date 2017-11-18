import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from './subcomponents/dateTimePicker';
import RequestAnonimityPicker from './subcomponents/requestAnonimityPicker';
import ContactMethodPicker from './subcomponents/contactMethodPicker';
import CategoryPicker from './subcomponents/categoryPicker';

class CommonDataInput extends Component {
	constructor(props) {
		super(props);

		this.handleInput = _.curry(this.handleInput)(this);
	}

	handleInput(component, field, e) {
		const newState = {};
		newState[field] = e.target.value;
		component.setState(newState);
	}

	render() {
		return (<div>
			Automatic ID Case number
			<DateTimePicker
				onChange={this.props.handleInput('timestamp')}
				value={this.props.timestamp}
			/>
			<ContactMethodPicker
				onChange={this.props.handleInput('contactMethod')}
				value={this.props.contactMethod}
			/>
			<CategoryPicker
				onChange={this.props.handleInput('category')}
				value={this.props.category}
			/>
			<RequestAnonimityPicker
				onChange={this.props.handleInput('requestAnonimity')}
				value={this.props.requestAnonimity}
			/>
		</div>);
	}
}

CommonDataInput.propTypes = {
	handleInput: PropTypes.func.isRequired,
	contactMethod: PropTypes.string,
	category: PropTypes.string,
	requestAnonimity: PropTypes.string
}

export default CommonDataInput;