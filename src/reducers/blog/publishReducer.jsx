import Immutable from 'immutable';
import {REQUEST_DATA,RECEIVE_DATA,REQUEST_ERROR} from '../../actions/commonAction';

const defaultState = Immutable.fromJS({});
function publishData (state = defaultState, action = {}){
    switch (action.type){
        case REQUEST_DATA:
            return state.set(action.fetchName,action);
        case RECEIVE_DATA:
            switch (action.fetchName){
                case 'getPublishInfos':{
                    //无需处理发表文章数据
                    break
                }
                case 'getBlogInfos':{
                    //无需处理发表文章数据
                    break
                }
                case 'getLabelInfos':{
                    //无需处理发表文章数据
                    break
                }
                case 'getBlogInfosByLabels':{
                    //无需处理发表文章数据
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

export {publishData}