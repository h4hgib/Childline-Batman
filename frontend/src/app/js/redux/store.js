import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function getStore(initialState) {
	const middleware = applyMiddleware(thunk);
	const createStoreWithMiddleware = compose(middleware);
	const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

	if (module.hot) {
		module.hot
			.accept('./reducers', () => {
				const nextRootReducer = rootReducer;
				store.replaceReducer(nextRootReducer);
			});
	}

	return store;
}
