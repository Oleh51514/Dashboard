import * as Redux from 'redux';
const { combineReducers } = Redux;
import { RootState } from '../store/index';
import UserReducer from './user.reducer';
import { routerReducer } from 'ng2-redux-router';

const rootReducer = combineReducers<RootState>({
  users: UserReducer,
  router: routerReducer
});

export default rootReducer;
