import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControl, ControlLabel, ToggleButtonGroup, ToggleButton, HelpBlock} from 'react-bootstrap';

const getValidationState = (props) => props.value ? 'success' : 'error';

class CategoryPicker extends Component {

	render() {
		return (
		<div>
			<FormGroup
				controlId="formBasicText"
				validationState={getValidationState(this.props)}
			>
				<div>
					<ControlLabel>Category</ControlLabel>
				</div>
				<div>
					<ToggleButtonGroup
						type="radio"
						value={this.props.value}
						onChange={this.props.onChange}
						justified
						name="category"
					>
						<ToggleButton value={'diverse'}>Diverse</ToggleButton>
						<ToggleButton value={'referral'}>Referral</ToggleButton>
						<ToggleButton value={'requestInformation'}>Request for Information</ToggleButton>
						<ToggleButton value={'appropriateAdult'}>Appropriate Adult</ToggleButton>
					</ToggleButtonGroup>
				</div>
				<div>
					<FormControl.Feedback />
					<HelpBlock>A category must be picked</HelpBlock>
				</div>
			</FormGroup>
		</div>);
	}
}

CategoryPicker.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func
};

export default CategoryPicker;