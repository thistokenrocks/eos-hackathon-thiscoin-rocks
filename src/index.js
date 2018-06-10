import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { configure, history } from './store';
import { Coins, Cells, Players } from './services/ApiRequest';
import Debounced from './services/Debounced';

const store = configure();
store.dispatch({ type: 'SCREEN_RESIZE' });

window.eos = window.Eos();

class Root extends Component {
  componentWillMount() {
    const { dispatch } = store;

    setInterval( () => {
      window.eos.getInfo({})
        .then(response => (dispatch({ type: 'BLOCKCHAIN_INFO', payload: response })))
        .catch(error =>  (dispatch({ type: 'BLOCKCHAIN_ERROR', payload: error })));
    }, 500);

    Coins.fetch()
      .then(response => (dispatch({ type: 'LIST_RECEIVED', payload: { source: 'coins', rows: response.rows } })))
      .catch(error =>  (dispatch({ type: 'LIST_ERROR', payload: { source: 'coins', error }})));
    Cells.fetch()
      .then(response => (dispatch({ type: 'LIST_RECEIVED', payload: { source: 'cells', rows: response.rows } })))
      .catch(error => (dispatch({ type: 'LIST_ERROR', payload: { source: 'cells', error }})));
    Players.fetch()
      .then(response => (dispatch({ type: 'LIST_RECEIVED', payload: { source: 'players', rows: response.rows } })))
      .catch(error =>  (dispatch({ type: 'LIST_ERROR', payload: { source: 'players', error }})));

  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}><App /></ConnectedRouter>
      </Provider>
    )
  };
}

const root = document.getElementById('root');
if (root) {
  render(<Root />, document.getElementById('root'));
  window.addEventListener('resize', () => {
    Debounced.start('resize', () => {
      store.dispatch({type: 'SCREEN_RESIZE'})
    }, 250)
  });
}
