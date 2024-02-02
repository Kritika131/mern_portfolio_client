import {combineReducers} from 'redux'
import { configureStore} from "@reduxjs/toolkit"
import portfolioSlice from './portfolioSlice'
import userReducer from './userSlice'
const reducer = combineReducers({
  portfolio:portfolioSlice,
  user:userReducer
})

const store = configureStore({
  reducer,
})

export default store;