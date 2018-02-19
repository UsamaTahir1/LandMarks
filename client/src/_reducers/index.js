import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { landmarks } from './landmark.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  landmarks
});

export default rootReducer;