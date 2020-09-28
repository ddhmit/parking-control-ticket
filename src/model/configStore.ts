import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';
import { isProd } from '~/util/env';

let middleware: any;
if (isProd()) {
  middleware = applyMiddleware(thunk);
} else {
  middleware = composeWithDevTools(applyMiddleware(thunk));
}
let store = createStore(reducers, middleware);

// let persistor = persistStore(store);

export default store;
