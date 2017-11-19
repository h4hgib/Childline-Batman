import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';

class Header extends Component {
	render() {
		if (!this.props.isAuthenticated) {
			return null;
		}
		return (<Navbar
				collapseOnSelect
				staticTop
			>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/contacts" exact>
							<a>Childline Records</a>
						</LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<LinkContainer to="/contacts" exact>
							<NavItem eventKey={1}>Previous Contacts</NavItem>
						</LinkContainer>
						<LinkContainer to="/form" exact>
							<NavItem eventKey={2}>Register Contact</NavItem>
						</LinkContainer>
						<LinkContainer to="/stats" exact>
							<NavItem eventKey={3}>Statistics</NavItem>
						</LinkContainer>
						<LinkContainer to="/admin" exact>
							<NavItem eventKey={4}>Admin</NavItem>
						</LinkContainer>
						<LinkContainer to="/logout" exact>
							<NavItem eventKey={5}>Log out</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Header);