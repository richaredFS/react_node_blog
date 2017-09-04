import Immutable from 'immutable';
import {REQUEST_DATA,RECEIVE_DATA,REQUEST_ERROR} from '../../actions/commonAction';

const defaultState = Immutable.fromJS({});
function loginData (state = defaultState, action = {}){
    switch (action.type){
        case REQUEST_DATA:
            return state.set(action.fetchName,action);
        case RECEIVE_DATA:
            switch (action.fetchName){
                case 'getRegisterInfos':{
                    //无需处理注册数据
                    break
                }
                case 'getLoginInfos':{
                    //无需处理登录数据
                    break
                }
            }
            return state.set(action.fetchName,action);
        case REQUEST_ERROR:
            return state.set(action.fetchName,action);
        default:
            return state;
    }
}

export {loginData}