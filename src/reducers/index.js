
import { combineReducers } from 'redux';
import loading from './loader/index'
import auth from './auth/index'
import user from './user/index'

export default combineReducers({
    loading,
    auth,
    user
});
