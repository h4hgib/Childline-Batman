import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth/actions.js';

class LogoutView extends Component {
	componentDidRender() {
		this.props.dispatch(logout());
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.isAuthenticathed) {
			axios.defaults.headers.common['Authorization'] = null;
			browserHistory.push('/login');
		}
	}

	render() {
		return (<div>
			Bye bye
			</div>);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticathed: state.auth.isAuthenticathed
});

LogoutView.propTypes = {
	isAuthenticathed: PropTypes.bool
};

export default connect(mapStateToProps)(LogoutView);