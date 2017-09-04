import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import route from './routers/routes'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index'
//引入蚂蚁金服的样式文件
import 'antd/dist/antd.css';
//redux-thunk是异步中间件，用于处理异步请求
let store = createStore(
    reducers,
    applyMiddleware(thunk)
);
//配置为hashHistory的话，地址栏会有#，因为hash就是取的#后面的值
ReactDOM.render(
    <Provider store={store}>
        <Router routes={route} history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
