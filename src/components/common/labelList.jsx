import React from 'react';
import {Tag} from 'antd'

class LabelList extends React.Component{
    constructor(props){
        super(props);
        this.state={ }
    }
    render(){
        return(
            <div style={{marginTop:'10px',marginBottom:'10px'}}>
               {this.props.labels.map(item=>{
                   return(
                       // 在循环输出子组件的时候一定要加唯一的key属性，key={item}，可以提高性能，因为这个react的diff算法有关系
                       <Tag color="#2db7f5" key={item}>{item}</Tag>
                   )
               })}
            </div>
        )
    }
}
export default LabelList;