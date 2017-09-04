import fetch from 'isomorphic-fetch';
import {blogAddr} from '../config/commonConfig'
const REQUEST_DATA = Symbol('REQUEST_DATA');
const RECEIVE_DATA = Symbol('RECEIVE_DATA');
const REQUEST_ERROR = Symbol('REQUEST_ERROR');

//开始获取数据
const requestData = (fetchName, params) => {
    return {
        type:REQUEST_DATA,
        isFetching:true,
        error:false,
        fetchName,
        params,
    }
};
//获取数据成功
const receiveData = (fetchName, data, params) => {
    return {
        type:RECEIVE_DATA,
        isFetching:false,
        error:false,
        fetchName,
        ...data,
        params
    }
};
//获取数据失败
const requestError = (fetchName, description, params) => {
    return {
        type:REQUEST_ERROR,
        isFetching:false,
        error:true,
        fetchName,
        description,
        params,
    }
};
//用name来唯一标识请求，不同的请求有不同的fetchName
function fetchData(uri, method, fetchName, params){
    let url, req;
    if(method==='POST'){
        url = `${blogAddr}${uri}`;
        req = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // withCredentials: true,
            //stringfy()是把原来的对象类型转成json对象(键值对)
            body: JSON.stringify(params),
        }
    }else{
        url = `${blogAddr}${uri}`;
        req = {method: 'GET'}
    }
    //因为有异步请求，所以手动dispatch
    return dispatch => {
        dispatch(requestData(fetchName, params));
        return fetch(url,req).then(response => {
            //ok是fetch的状态
            if (response.ok) {
                response.json().then(json => {
                    if(json.resultCode===0 || json.resultCode===-1){
                        dispatch(receiveData(fetchName, json, params));
                    }else{
                        const description=`请求错误,uri: ${uri}; 错误码: ${json.resultCode}; 错误描述: ${json.message}`;
                        console.error(description);
                        dispatch(requestError(fetchName, description, params));
                    }
                })
            } else {
                const description=`请求失败,uri: ${uri}; status: ${response.status}`;
                console.error(description);
                dispatch(requestError(fetchName, description, params));
            }
        }).catch(error => {
            const description=`请求失败,uri: ${uri}; error: ${error}`;
            console.error(description);
            dispatch(requestError(fetchName, description, params));
        });
    }
}
export {
    REQUEST_DATA,RECEIVE_DATA,REQUEST_ERROR,fetchData
}