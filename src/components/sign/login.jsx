import React from 'react';
import { Button, Form, Input,message } from 'antd';
import * as commonAction from '../../actions/commonAction';
import {post} from '../../config/tool';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

class Login extends React.Component {
    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    }
    //重置登录表单内容
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    //提交登录请求
    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            // const param = {
            //     username:values.name,
            //     password:values.passwd,
            // };
            // this.fetchInfos(param)
            post('http://localhost:8080/login', {
                username:values.name,
                password:values.passwd,
            }).then((res) => {
                if (res.result) {
                    message.success('登陆成功')
                    hashHistory.push('/blogList');
                    localStorage.setItem("login","true")
                    localStorage.setItem("username",values.name)
                    localStorage.setItem("uid",res.user.uid)
                }else{
                    message.error('用户名或者密码错误！')
                }
            })
        });
    };
    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd']);
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }
    fetchInfos = (param)=>{
        this.props.fetchData(
            '/login',
            'POST',
            'getLoginInfos',
            param
        )
    };
    render() {
        message.config({
            top: 150
        });
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, message: '请填写用户名' },
            ],
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass.bind(this) },
            ],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className="login-container">
                <div style={{width:"60%"}}>
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            {...formItemLayout}
                            label="用户名：">
                            <Input {...nameProps} placeholder="请输入用户名" />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="密码："
                            hasFeedback>
                            <Input {...passwdProps} placeholder="请输入密码" type="password" autoComplete="off"
                                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
                        </FormItem>

                        <FormItem wrapperCol={{ span: 12, offset: 7 }} style={{textAlign:'center'}}>
                            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const LoginForm = createForm()(Login);
export default connect(state=>{
    const loginData = state.loginData.toJS().getLoginInfos?(state.loginData.toJS().getLoginInfos):{isFetching:true};
    return {
        data:loginData
    }
},commonAction)(LoginForm);
