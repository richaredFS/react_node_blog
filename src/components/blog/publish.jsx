import React from 'react';
import { Form, Input, Button ,message} from 'antd';
import * as commonAction from '../../actions/commonAction';
import {post} from '../../config/tool';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
const FormItem = Form.Item;
message.config({
    top: 300,
    duration:1
});

class Publish extends React.Component{
    constructor(props){
        super(props);
        this.state={ }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(localStorage.getItem("username")===null){
            message.error('请先登录再发表文章');
            //好像没生效
            setTimeout(hashHistory.push("/login"),5000)

        }else{
            post('http://localhost:8080/publish', {
                title:this.props.form.getFieldsValue().title,
                description:this.props.form.getFieldsValue().description,
                content:this.props.form.getFieldsValue().content,
                label:this.props.form.getFieldsValue().label,
                username:localStorage.getItem("username"),
                uid:localStorage.getItem("uid")
            }).then((res) => {
                if (res.result) {
                    message.success('发布成功')
                    hashHistory.push('/blogList');
                }else{
                    message.error('发布失败！')
                }
            })
        }
    };

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div className="publish-container">
                <div className="publish">
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormItem
                            id="control-input"
                            label="文章标题："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}>
                            <Input id="control-input" placeholder="请输入文章标题..." {...getFieldProps('title')}/>
                        </FormItem>
                        <FormItem
                            id="control-textarea"
                            label="文章描述："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}>
                            <Input type="textarea" id="control-textarea" rows="3" placeholder="文章剪短描述，小于100个字"
                                   {...getFieldProps('description')}/>
                        </FormItem>
                        <FormItem
                            id="control-textarea"
                            label="文章内容："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}>
                            <Input type="textarea" id="control-textarea" rows="3" placeholder="文章主要内容"
                                   {...getFieldProps('content')}/>
                        </FormItem>
                        <FormItem
                            id="control-input"
                            label="文章标签："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}>
                            <Input id="control-input" placeholder="标签若大于1个，请用逗号隔开"
                                   {...getFieldProps('label')}/>
                        </FormItem>
                        <div style={{textAlign:'center'}}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
const PublishForm = Form.create()(Publish);
export default connect(state=>{
    const publishData = state.publishData.toJS().getPublishInfos?(state.publishData.toJS().getPublishInfos):{isFetching:true};
    return {
        data:publishData
    }
},commonAction)(PublishForm);