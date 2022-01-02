// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import emploi from './emploi'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  emploi
})

export default rootReducer
