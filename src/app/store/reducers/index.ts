import {combineReducers} from '@reduxjs/toolkit';
import chatSlice from './chat/chatSlice';

const rootReducer = combineReducers({
  chatSlice,
});

export default rootReducer;
