import React from 'react';
import { Button, Form, Input,message } from 'antd';
import {post} from '../../config/tool';
import {hashHistory} from 'react-router';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
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
    render(){
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
        return(
            <div className="home-container">
                <div className="home-picture">
                    <div className="picture">
                        <img alt="" src={require('../../styles/images/github.png')}/>
                    </div>
                    <div className="description">
                        github: <a href="https://github.com/richaredFS">https://github.com/richaredFS</a>
                    </div>
                    <div className="description">
                        个人博客系统，主要分享react+redux+webpack+node技术栈，欢迎大家留言交流！
                        博客系统欢迎大家提bug！
                    </div>
                </div>
                <div className="home-login-container">
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
            </div>

        )
    }
}
const HomeForm = createForm()(Home);
export default HomeForm;
