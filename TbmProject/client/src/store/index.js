import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userListReducer from './userListReducer';
import currentUserReducer from './currentUserReducer';

const rootReducer = combineReducers({
  userList: userListReducer,
  currentUser: currentUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;