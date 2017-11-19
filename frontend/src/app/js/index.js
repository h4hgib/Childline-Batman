import React, {Component} from 'react';
import {Provider} from 'react-redux';
import getStore from './redux/store.js';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import LoginView from './views/login';
import ContactsView from './views/contacts';
import NewFormView from './views/newForm';
import FormView from './views/form';
import StatsView from './views/stats';
import AdminView from './views/admin';
import LogoutView from './views/logout';
import Header from './views/navigation/header';
import Footer from './views/navigation/footer';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.history = createBrowserHistory();
		this.store = getStore({});
	}

	render() {
		return (
			<Provider store={this.store}>
				<Router history={this.history}>
					<div>
						<Route
							path="/"
							component={Header}
						/>
						<div className="container">
							<Switch>
								<Route
									exact
									path="/"
									component={LoginView}
								/>
								<Route
									path="/login"
									component={LoginView}
								/>
								<Route
									path="/contacts"
									component={ContactsView}
								/>
								<Route
									path="/form"
									component={NewFormView}
								/>
								<Route
									path="/form/:id"
									component={FormView}
								/>
								<Route
									path="/stats"
									component={StatsView}
								/>
								<Route
									path="/admin"
									component={AdminView}
								/>
								<Route
									path="/logout"
									component={LogoutView}
								/>
							</Switch>
						</div>
						<Route
							path="/"
							component={Footer}
						/>
					</div>
				</Router>
			</Provider>);
	}
}