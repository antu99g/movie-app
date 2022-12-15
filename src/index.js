import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./reducers";


// logger(obj, next, action)
// const logger = function ({ dispatch, getState }) {
// 	return function (next) {
// 		return function (action) {
// 			// middleware code
// 			console.log('ACTION_TYPE = ', action.type);
// 			next(action);
// 		}
// 	}
// }


const logger = ({ dispatch, getState }) => (next) => (action) => {
	// middleware code
  if(typeof action !== 'function') {
    console.log('ACTION_TYPE = ', action.type);
  }
	next(action);
}

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if(typeof action === 'function') {
    action(dispatch);
    return;
  }
	next(action);
}



// const store = createStore(combineReducers);
const store = configureStore({
   reducer: combineReducers,
   middleware: [logger, thunk],
});


export const StoreContext = createContext();


export function connect (callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor (props) {
        super(props);
        this.unsubscribe = this.props.state.subscribe(() => this.forceUpdate());
      }

      componentWillUnmount () {
        this.unsubscribe();
      }

      render() {
        const {store} = this.props;
        const state = store.getState();
        const dastaToBePassed = callback(state);
        return <Component {...dastaToBePassed} dispatch={store.dispatch} />;
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return <StoreContext.Consumer>
          {store => <ConnectedComponent store={store} />}
        </StoreContext.Consumer>
      }
    }

    return ConnectedComponentWrapper;
  }
}


class Provider extends React.Component {
  render() {
    const {store} = this.props;
    return <StoreContext.Provider value={store}>
      {this.props.children}
    </StoreContext.Provider>    
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);