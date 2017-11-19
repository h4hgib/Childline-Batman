import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import {FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'react-bootstrap';
import {loginUser} from '../../redux/auth/actions.js';

class LoginView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.handleInput = _.curry(this.handleInput)(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isAuthenticated) {
			console.log('nextProps', nextProps);
			axios.defaults.headers.common['Authorization'] = nextProps.token;
			this.props.history.push('/newForm');
		} else {
			axios.defaults.headers.common['Authorization'] = null;
		}
	}

	handleInput(component, field, e) {
		const newState = {};
		newState[field] = e.target.value;
		component.setState(newState);
	}

	handleLogin(e) {
		this.props.dispatch(loginUser(
			this.state.username,
			this.state.password
		));
	}

	render() {
		return (<div>
				<img/>
				<h2>
					Childline
				</h2>
				<FormGroup>
					<ControlLabel>
						Username:
					</ControlLabel>
					<FormControl
						type="text"
						onChange={this.handleInput('username')}
						value={this.state.username}
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>
						Password:
					</ControlLabel>
					<FormControl
						type="password"
						onChange={this.handleInput('password')}
						value={this.state.password}
					/>
				</FormGroup>
				<ButtonToolbar>
					<Button
						bsStyle="primary"
						onClick={this.handleLogin}
					>
						Login
					</Button>
				</ButtonToolbar>
			</div>);
	}
}

LoginView.propTypes = {
	isAuthenticated: PropTypes.bool,
	isAuthenticating: PropTypes.bool,
	token :PropTypes.string
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	isAuthenticating: state.auth.isAuthenticating,
	token: state.auth.token
});

export default connect(mapStateToProps)(LoginView);