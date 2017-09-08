import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from '../components/App';

//登录与注册页面路由
const register = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/sign/register').default)
    },'register')
};
const login = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/sign/login').default)
    },'login')
};
//博客首页路由
const home = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/home/home').default)
    },'home')
};
//所有博文路由
const blogList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/blog/blogList').default)
    },'blogList')
};
//关于我路由
const me = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/user/me').default)
    },'me')
};
//发表文章路由
const publish = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/blog/publish').default)
    },'publish')
};
//文章详情的路由
const blogDetail = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/blog/blogDetail').default)
    },'blogDetail')
};

//path='cacheSpeed'是相对路径的写法（不加/），这时候的路径是相对父组件路径的，
// 比如父组件的path='/index',那么path='cacheSpeed'就相当于/index/cacheSpeed
//与APP组件做成平级的，增加一个平级的Route
const RouteConfig = (
    <Route>
        <Route path='/' component={App}>
            {/*设置indexRoute可以解决首页白屏的问题*/}
            <IndexRoute  getComponent={home}/>
            <Route path="register" getComponent={register}/>
            <Route path="login" getComponent={login}/>
            <Route path="home" getComponent={home}/>
            <Route path="blogList" getComponent={blogList}/>
            <Route path="me" getComponent={me}/>
            <Route path="publish" getComponent={publish}/>
            <Route path="blogList/:id" getComponent={blogDetail}/>
            {/*<Redirect from='*' to='/'/>*/}
        </Route>
    </Route>
);

export default RouteConfig;