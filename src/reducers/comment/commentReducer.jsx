import Immutable from 'immutable';
import {REQUEST_DATA,RECEIVE_DATA,REQUEST_ERROR} from '../../actions/commonAction';

const defaultState = Immutable.fromJS({});
function commentData (state = defaultState, action = {}){
    switch (action.type){
        case REQUEST_DATA:
            return state.set(action.fetchName,action);
        case RECEIVE_DATA:
            switch (action.fetchName){
                case 'getCommentInfos':{
                    //无需处理评论数据
                    break
                }
                default:
                    return state;
            }
            return state.set(action.fetchName,action);
        case REQUEST_ERROR:
            return state.set(action.fetchName,action);
        default:
            return state;
    }
}

export {commentData}