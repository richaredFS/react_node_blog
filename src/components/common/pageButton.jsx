import React from 'react';
import {Button,Input} from 'antd'
class PageButton extends React.Component {

    constructor(props) {
        super(props);
        this.setNext=this.setNext.bind(this);
        this.setUp=this.setUp.bind(this);
        this.state={
            num: 0,
            //current属性属于是listBox这个父组件传下来的。
            pagenum:this.props.current
        }
    }

    //下一页
    setNext=()=>{
        if(this.state.pagenum < this.props.totalPage){
            this.setState({
                num:this.state.num + this.props.pageSize,
                pagenum:this.state.pagenum + 1
            },function () {
                console.log(this.state);
                //子组件给父组件传值的方法,pageNext是父组件的一个属性<PageButton { ...this.state } pageNext={this.pageNext} />
                this.props.pageNext(this.state.num)
            })
        }
    };

    //上一页
    setUp=()=>{
        if(this.state.pagenum > 1){
            //setState完成之后的回调函数，还能有这样的操作，666
            this.setState({
                num:this.state.num - this.props.pageSize,
                pagenum:this.state.pagenum - 1
            },function () {
                console.log(this.state)
                this.props.pageNext(this.state.num)
            })
        }
    };
    gotoPage(e){
      console.log(e.target.value);
        this.setState({
            num:(e.target.value-1)*this.props.pageSize,
            pagenum:e.target.value
        },function () {
            console.log(this.state)
            this.props.pageNext(this.state.num)
        })
    };
    render() {
        return (
            <div className="change_page">
                <Button type="primary" onClick={this.setUp}>上一页</Button>
                <Button type="primary" style={{cursor:"default",marginLeft:"5px"}}>{ this.state.pagenum }页/ { this.props.totalPage }页</Button>
                <Button type="primary" onClick={this.setNext} style={{marginLeft:"5px"}}>下一页</Button>
                <div style={{marginLeft:'10px'}}>跳转至<Input placeholder="页数" style={{width:'50px',marginLeft:'5px'}} onPressEnter={(e)=>this.gotoPage(e)}/></div>
            </div>
        );
    }
}
export default PageButton