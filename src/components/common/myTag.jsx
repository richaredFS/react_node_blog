import React from 'react';
import { Tag,Input } from 'antd';
import {removeByValue} from '../../config/tool';
import * as commonAction from '../../actions/commonAction';
import {connect} from 'react-redux';
const { CheckableTag } = Tag;

class MyTag extends React.Component {
    constructor(props){
        super(props);
        this.state={
            checked: false
        };
        //存放查询labels的数组，不能放在handleChange里面
        global.arr = []
    }
    handleChange = (checked) => {
        console.log(checked);
        this.setState({ checked });
        if(checked === true){
            global.arr.push(this.props.labels)
        }else{
            //删除数组中指定的元素
            removeByValue(global.arr,this.props.labels)
        }
        console.log(global.arr)
        this.fetchInfos(global.arr)
    };
    componentWillMount(){

    }
    fetchInfos(arg){
        const param = {
            start:0,
            num:0,
            labels:arg
        };
        console.log(param)
        //根据标签查找对应的博文
        this.props.fetchData(
            '/blogList',
            'POST',
            'getBlogInfos',
            param
        )
    }
    render() {
        return(
            <div>
                <div>
                    <CheckableTag checked={this.state.checked} onChange={this.handleChange}>{this.props.labels}</CheckableTag>
                </div>
            </div>
            )
    }
}
// export default MyTag;
export default connect(state=>{
    const blogList = state.publishData.toJS().getBlogInfos?(state.publishData.toJS().getBlogInfos):{isFetching:true};
    return {
        data: blogList
    }
},commonAction)(MyTag)