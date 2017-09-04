import React from 'react';
import {Button,Spin} from 'antd';
import {Link} from 'react-router';
import * as commonAction from '../../actions/commonAction';
import {connect} from 'react-redux';
//自定义组件的引入方式
import ListBox from '../common/listBox';
import MyTag from '../common/myTag';

class BlogList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked:false
        }
    }
    publish=()=>{
        console.log("正在发表文章")
    };
    componentWillMount(){
        const param = {
            start:0,
            num:0
        };
        this.fetchInfos(param)
    };
    fetchInfos = (param)=>{
        //获取所有的博客
        this.props.fetchData(
            '/blogList',
            'POST',
            'getBlogInfos',
            param
        );
        //获取所有的标签
        this.props.fetchData(
            '/labelList',
            'POST',
            'getLabelInfos',
            param
        )
    };
    allArticles = ()=>{
        const param = {
            start:0,
            num:0
        };
        this.fetchInfos(param)
    };
    handleChange = (checked) => {
        this.setState({ checked });
    };
    render(){
        return(
            <div>
                <div className="blog-list-container">
                    <div className="button-group">
                        <Button type="primary" onClick={this.allArticles}>全部文章</Button>
                        <Button type="primary" style={{marginLeft:'10px'}} onClick={this.publish}><Link to="/publish" style={{textDecoration:'none'}}>发表文章</Link></Button>
                        <span className="result">共 {this.props.data.isFetching?<Spin/>:this.props.data.totalNum} 条查询结果</span>
                    </div>
                    {/*自定义循环列表组件*/}
                    {this.props.data.isFetching?<Spin/>:<ListBox list={this.props.data.blogList}/>}
                </div>
                <div className="blog-list-label">
                    <span style={{fontSize:'15px',fontWeight:'bold'}}>标签分类</span>
                    <div className="blog-label-container">
                        {this.props.labelData.isFetching?<Spin/>:
                            this.props.labelData.labelList.map(item=>{
                                return(
                                    // 在循环输出子组件的时候一定要加唯一的key属性，key={item}
                                    <div style={{marginTop:'10px'}} key={item}>
                                        <MyTag labels={item}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(state=>{
    const blogData = state.publishData.toJS().getBlogInfos?(state.publishData.toJS().getBlogInfos):{isFetching:true};
    const labelData = state.publishData.toJS().getLabelInfos?(state.publishData.toJS().getLabelInfos):{isFetching:true};
    return {
        data: blogData,
        labelData: labelData
    }
},commonAction)(BlogList);