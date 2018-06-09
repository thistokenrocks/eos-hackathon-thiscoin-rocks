import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as responsive } from 'react-responsive-redux';
import { reducer as toastr } from 'react-redux-toastr'

import screen from './screen';
import list from './list';
import join from './join';
import map from './map';
import account from './account';

const reducers = {
  router, list, responsive, screen, toastr, join, map, account
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
