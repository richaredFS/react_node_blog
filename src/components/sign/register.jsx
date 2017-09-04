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

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
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
    //重置表单内容
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    //提交注册请求
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            // const param = {
            //     username:values.name,
            //     password:values.passwd,
            //     repPass:values.rePasswd
            // };
            // this.fetchInfos(param);
            post('http://localhost:8080/register', {
                username:values.name,
                password:values.passwd,
                repPass:values.rePasswd
            }).then((res) => {
                if (res.result) {
                    message.success('注册成功')
                    hashHistory.push('/login');
                }else{
                    message.error('用户名不合法！')
                }
            })
        });
    };

    userExists = (rule, value, callback)=> {
        if (!value) {
            callback();
        } else {
            console.log(value)
            setTimeout(() => {
                if (value==='jsonjson') {
                    callback([new Error('该用户名已被占用')]);
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
            '/register',
            'POST',
            'getRegisterInfos',
            param
        )
    };
    componentWillMount(){

    }

    render() {
        message.config({
            top: 150
        });
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, min: 2, message: '用户名至少为 2 个字符' },
                { validator: this.userExists },
            ],
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass.bind(this) },
            ],
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2.bind(this),
            }],
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
                            label="用户名："
                            hasFeedback
                            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
                            <Input {...nameProps} placeholder="请输入用户名"/>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="密码："
                            hasFeedback>
                            <Input {...passwdProps} type="password" autoComplete="off" placeholder="请输入密码"
                                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="确认密码："
                            hasFeedback>
                            <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="请再次输入密码"
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

const RegisterForm = createForm()(Register);

export default connect(state=>{
    const registerData = state.loginData.toJS().getRegisterInfos?(state.loginData.toJS().getRegisterInfos):{isFetching:true};
    return {
        data:registerData
    }
},commonAction)(RegisterForm);