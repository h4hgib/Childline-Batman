import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import _ from 'lodash';
import {getSingleContact, updateContact} from '../../redux/contacts/actions.js';

import diverseSchema from '../../schemas/form/diverse/form.json';
import diverseUiSchema from '../../schemas/form/diverse/form.ui.json';
import referralSchema from '../../schemas/form/referral/form.json';
import referralUiSchema from '../../schemas/form/referral/form.ui.json';
import infoRequestSchema from '../../schemas/form/infoRequest/form.json';
import infoRequestUiSchema from '../../schemas/form/infoRequest/form.ui.json';
import appropiateAdultSchema from '../../schemas/form/appropiateAdult/form.json';
import appropiateAdultUiSchema from '../../schemas/form/appropiateAdult/form.ui.json';

class FormView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {

			},
			schema: null,
			uiSchema: null
		};

		this.handleInput = _.curry(handleInput)(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(getSingleContact(this.props.params.id));
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.current !== nextProps.current && nextProps.current) {
			const stateItem = {
				formData: nextProps.current
			};

			if (nextProps.current.category === 'Diverse') {
				stateItem.schema = diverseSchema;
				stateItem.uiSchema = diverseUiSchema;
			} else if (nextProps.current.category === 'Referral') {
				stateItem.schema = referralSchema;
				stateItem.uiSchema = referralUiSchema;
			} else if (nextProps.current.category === 'Request for Information') {
				stateItem.schema = infoRequestSchema;
				stateItem.uiSchema = infoRequestUiSchema;
			} else if (nextProps.current.category === 'Appropiate Adult') {
			} else {
				stateItem.schema = appropiateAdultSchema;
				stateItem.uiSchema = appropiateAdultUiSchema;
			}
			this.setState(stateItem);
		}
	}

	handleSubmit(e) {
		const transformFormData = (formData) => formData;
		this.props.dispatch(postContact(transformFormData(this.state.formData)));
	}

	render() {
		return (<div>
				<PageHeader>
					Contact Data
				</PageHeader>
				<div>
					<div className="contact-data">
					</div>
					{this.state.schema && <Form
						schema={this.state.schema}
						uiSchema={this.state.uiSchema}
						formData={this.state.formData}
						onSubmit={this.handleSubmit}
						onChange={this.handleInput('formData')}
					/>}
				</div>
			</div>);
	}
}

const mapStateToProps = (state) => ({
	current: state.contacts.current
});

export default connect(mapStateToProps)(FormView);