import { combineReducers } from 'redux';
import autheduser from './authedUser';
import users from './users';
import tweets from './tweets';

export default combineReducers({
  autheduser,
  users,
  tweets
});
