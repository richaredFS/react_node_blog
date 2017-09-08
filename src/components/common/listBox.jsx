import React from 'react';
import PageButton from './pageButton';
import LabelList from './labelList';
import {Link,hashHistory} from 'react-router'
import * as commonAction from '../../actions/commonAction';
import {connect} from 'react-redux';

class ListBox extends React.Component {
    constructor(props){
        super(props);
        this.pageNext=this.pageNext.bind(this);
        this.setPage=this.setPage.bind(this);
        this.state = {
            dataList:'',//当前渲染的页面数据
            //this.prosp.list继承自父组件的属性
            totalData:this.props.list,
            current: 1, //当前页码
            pageSize:5, //每页显示的条数
            goValue:0,  //要去的条数index
            totalPage:0,//总页数
        };
    }
    componentWillMount(){
        //设置总页数
        this.setState({
            totalPage:Math.ceil( this.props.list.length/this.state.pageSize),
        });
        this.pageNext(this.state.goValue)
    }

    //设置内容
    setPage=(num)=>{
        this.setState({
            dataList:this.state.totalData.slice(num,num+this.state.pageSize)
        });
    };
    //num这个数据接受自子组件PageButton，this.props.pageNext(this.state.num)
    pageNext=(num)=>{
        this.setPage(num)
    };
    handleClick = (event)=>{
        event = event.nativeEvent;
        const li = event.target.parentNode;
        //因为Link标签的to属性带不上变量，所以用这种办法
        hashHistory.push('/blogList/'+li.id);
        const param = {
            id:li.id
        };
        this.fetchInfos(param)
    };
    fetchInfos =(param)=>{
        this.props.fetchData(
            '/flushPv',
            'POST',
            'getPvOrCommentInfos',
            param
        );
    };
    render() {
        return (
            <div className="main">
                <div className="top_bar">
                </div>
                <div className="lists">
                    <ul className="index">
                        {this.state.dataList.map(item=>{
                            return(
                                // 在循环输出子组件的时候一定要加唯一的key属性，key={item.id}
                                <div style={{borderBottom:"solid 2px #ccc",marginTop:"10px"}} key={item.id}>
                                    {/*先把文章id赋值给行号，获取所在行的id*/}
                                    <li style={{color:'#0366d6',fontSize:'12px',fontWeight:"bold"}} id={item.id}>
                                        <Link onClick={this.handleClick.bind(this)}>{item.title}</Link>
                                    </li>
                                    <li style={{marginTop:"5px"}}>
                                        {item.description}
                                    </li>
                                    <li style={{marginBottom:"5px"}}>
                                        <LabelList labels={item.label}/>
                                    </li>
                                    <div className="author">
                                        <li>
                                            <div style={{width:'150px'}}>
                                                创建时间: {item.createTime}
                                            </div>

                                        </li>
                                        <li style={{width:'150px'}}>
                                            <div style={{marginLeft:'20px'}}>
                                                作者: {item.author}
                                            </div>

                                        </li>
                                        <li style={{marginLeft:'200px'}}>
                                            <div>
                                                评论数: {item.comments}
                                            </div>

                                        </li>
                                        <li style={{marginLeft:'20px'}}>
                                            <div>
                                                浏览数: {item.pv}
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                    <PageButton { ...this.state } pageNext={this.pageNext} />
                </div>
            </div>
        );
    }
}
export default connect(state=>{
    const blogData = state.publishData.toJS().getBlogInfos?(state.publishData.toJS().getBlogInfos):{isFetching:true};
    return {
        data: blogData
    }
},commonAction)(ListBox)