import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (<Navbar
			fixedBottom
		>
			<Navbar.Header>
				<Navbar.Brand>
					Childline 2017 - Batman Team
				</Navbar.Brand>
			</Navbar.Header>
		</Navbar>);
	}
}

export default Footer;