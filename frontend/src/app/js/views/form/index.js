import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import _ from 'lodash';
import {updateContact} from '../../redux/contacts/actions.js';

class FormView extends Component {
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
		this.props.dispatch(this.props.params.id)
	}

	handleSubmit(e) {
		this.props.dispatch(postContact(transformFormData(this.state.formData)));
	}

	render() {
		return (<div>
				<PageHeader>
					Contact Data
				</PageHeader>
				<div>
					<Form
					/>
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(FormView);