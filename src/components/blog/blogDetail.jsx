import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as commonAction from '../../actions/commonAction'
import {Spin,Input,Button,message} from 'antd';
import CommentList from '../common/commentList'
const { TextArea } = Input;
message.config({
    top: 300,
    duration: 3,
});

class BlogDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:""
        }
    }
    fetchInfos = (param,flag)=>{
        if(flag === 'pbcomment'){
            this.props.fetchData(
                '/publishComment',
                'POST',
                'getPublishCommentInfos',
                param
            )
        }else if(flag === 'commentlist'){
            this.props.fetchData(
                '/commentList',
                'POST',
                'getCommentInfos',
                param
            );
            this.props.fetchData(
                '/flushComment',
                'POST',
                'getPvOrCommentInfos',
                param
            );
        }else{
            this.props.fetchData(
                '/blogList/'+param.id,
                'POST',
                'getBlogInfos',
                param
            );
            this.props.fetchData(
                '/commentList',
                'POST',
                'getCommentInfos',
                param
            )
        }
    };
    componentWillMount(){
        let position = window.location.href.lastIndexOf('/');
        let id = window.location.href.substring(position+1);
        const param = {
            start:0,
            num:0,
            id:id
        };
        this.fetchInfos(param)
    }
    publish = ()=>{
        let position = window.location.href.lastIndexOf('/');
        let id = window.location.href.substring(position+1);
        const param1 = {
            id:id,
            content:this.state.text,
            commentator:localStorage.getItem("username")
        };
        const param2 = {
            id:id
        };
        //插入评论内容
        if(param1.commentator === null){
            message.error('请先登录再评论');
        }else if(param1.content === ""){
            message.warning('你还没有输入任何内容');
        }else{
            this.fetchInfos(param1,'pbcomment')
        }
        //刷新所有评论和评论数
        this.fetchInfos(param2,'commentlist');
        //清空评论
        this.setState({text:""})
    };
    handleChange=(e)=>{
        this.setState({text: e.target.value});
    };
    goBack = ()=>{
      hashHistory.push('/blogList');
    };
    render(){
        let blogList = this.props.data.isFetching?null:this.props.data.blogList[0];
        return(
            this.props.data.isFetching?<Spin/>:
            <div>
                <div>
                    <Button type="primary" onClick={this.goBack} >返回</Button>
                </div>
                <div style={{marginTop:'10px',borderTop:"solid 2px #ccc",}}>
                    <div style={{fontSize:'13px',fontWeight:'bold',marginTop:'10px'}}><span style={{color:'#0366d6'}}>{blogList.title}</span><span style={{float:'right',marginRight:'100px'}}>创建时间 : {blogList.createTime}
                        &nbsp;&nbsp;&nbsp;&nbsp;作者 : {blogList.author}</span></div>
                    <div style={{fontSize:'13px',fontWeight:'bold',marginTop:'10px'}}>{blogList.content}</div>
                </div>
                <div className="comment">
                    <div className="comment-list">
                        {this.props.data.isFetching || this.props.commentData.isFetching?<Spin/>:<CommentList list={this.props.commentData}/>}
                    </div>
                    <div className="comment-region">
                        {/*refs的坑没踩过去*/}
                        <TextArea rows={4} value={this.state.text} onChange={this.handleChange} placeholder="有什么感想，你也来说说吧！"/>
                        <Button type="primary" onClick={this.publish} style={{marginTop:'10px'}}>发表评论</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(state=>{
    const blogData = state.publishData.toJS().getBlogInfos?(state.publishData.toJS().getBlogInfos):{isFetching:true};
    const commentData = state.commentData.toJS().getCommentInfos?(state.commentData.toJS().getCommentInfos):{isFetching:true};
    return {
        data : blogData,
        commentData: commentData
    }
},commonAction)(BlogDetail)