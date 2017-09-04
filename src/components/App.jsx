import React from 'react';
import { Layout, Menu, Breadcrumb, Icon,Button,Dropdown} from 'antd';
import {Link} from 'react-router';
import {get} from '../config/tool';
import '../styles/common.less'
const {Content, Footer, Sider} = Layout;

class App extends React.Component {
    constructor(props){
        super(props);
        //judgeMenuOption返回的值，这两个值赋给下面的state里面的属性
        let {selectedKeys,selectedItem} = this.judgeMenuOption();
        this.state = {
            menuMode : 'inline',
            selectedKeys:selectedKeys,//当前被选择的菜单项
            selectedItem:selectedItem,
        };
    }
    onSelectMenuItem = ({selectedKeys})=>{
        this.setState({selectedKeys});
    };
    changeMenuMode = ()=>{
        let menuMode = this.state.menuMode==='inline'?'vertical':'inline';
        let {selectedKeys} = this.judgeMenuOption(menuMode);
        this.setState({menuMode,selectedKeys});
    };

    judgeMenuOption = ()=>{
        let urlHash=window.location.hash;
        let selectedKeys;
        let selectedItem;
        if(urlHash.indexOf('register')>=0){
            //都要放置成数组
            selectedKeys = ['register'];
        }else if(urlHash.indexOf('login')>=0){
            selectedKeys = ['login'];
        }else if(urlHash.indexOf('home')>=0){
            selectedKeys = ['home'];
            selectedItem = '博客首页';
        }else if(urlHash.indexOf('blogList')>=0){
            selectedKeys = ['blogList'];
            selectedItem = '所有博文';
        }else if(urlHash.indexOf('me')>=0){
            selectedKeys = ['me'];
            selectedItem = '关于我';
        }else if(urlHash.trim()==='#/'){
            selectedKeys = ['home'];
            selectedItem = '博客首页';
        }
        return {selectedKeys,selectedItem};
    };
    login = ()=>{
        console.log("正在请求登录")
    };
    register = ()=>{
        console.log("正在请求注册")
    };
    handleClick = ()=>{
        let urlHash=window.location.hash;
        if(urlHash.indexOf('home')>0){
            this.state.selectedItem='博客首页'
        }else if(urlHash.indexOf('blogList')>0){
            this.state.selectedItem='所有博文'
        }else{
            this.state.selectedItem='关于我'
        }
    };
    loginOut = (e)=>{
        get("http://localhost:8080/signout").then((res)=>{
            if(res.result){
                localStorage.clear();
                localStorage.setItem("login","false");
                window.location.reload()
            }
        })
    };
    render() {
        const menu = (
            <Menu onClick={this.loginOut}>
                <Menu.Item key="user">
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <div className="login-register">
                    <img className="logo" src={require('../styles/images/github.png')}/>
                    <span className="title">Welcome to Richared Blog!</span>
                    {localStorage.getItem("login")==="true"?(
                        <div style={{marginRight:'20px'}}>
                            <Dropdown overlay={menu}>
                                <Button style={{ marginLeft: 8 }}>
                                    {localStorage.getItem("username")} <Icon type="down" />
                                    {/*影藏域*/}
                                    <input id="uid" name="userId" type="hidden" value={localStorage.getItem("uid")}/>
                                </Button>
                            </Dropdown>
                        </div>
                    ):(
                        <div className="buttons">
                            <Button type="primary" className="login-button" onClick={this.login}><Link to="/login" style={{textDecoration:'none'}}>登录</Link></Button>
                            <Button type="primary" className="login-button" onClick={this.register}><Link to="/register" style={{textDecoration:'none'}}>注册</Link></Button>
                        </div>
                    )}

                </div>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu onClick={this.handleClick} style={{ height: '100%', borderRight: 0 }}
                              mode={this.state.menuMode} selectedKeys={this.state.selectedKeys} onSelect={this.onSelectMenuItem}>
                            <Menu.Item key="home"><Link to="/home"><Icon type="home"/><span className="primary-title">博客首页</span></Link></Menu.Item>
                            <Menu.Item key="blogList"><Link to="/blogList"><Icon type="database"/><span className="primary-title">所有博文</span></Link></Menu.Item>
                            <Menu.Item key="me"><Link to="/me"><Icon type="user"/><span className="primary-title">关于我</span></Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item><span className="subtitle">{this.state.selectedItem}</span></Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            {this.props.children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Blog ©2017 Created by Richared
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;
