import { combineReducers } from 'redux'

import {loginData} from './login/loginReducer'
import {publishData} from './blog/publishReducer'

//记得一定要把所有的reducer都放在这里注入
export default combineReducers({
    loginData,publishData
})