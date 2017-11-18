import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import {logout} from '../../redux/auth/actions.js';

class LogoutView extends Component {
	componentDidMount() {
		this.props.dispatch(logout());
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.isAuthenticated) {
			axios.defaults.headers.common['Authorization'] = null;
			this.props.history.push('/login');
		}
	}

	render() {
		return (<div>
			Bye bye
			</div>);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

LogoutView.propTypes = {
	isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps)(LogoutView);