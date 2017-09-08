import React from 'react';
import PageButton from './pageButton';

class CommentList extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    componentWillMount(){

    }
    render() {
        return (
            <div className="main">
                <div className="top_bar">
                </div>
                <div className="comment-lists">
                    <div style={{fontWeight:'bold',fontSize:'15px',marginTop:'10px'}}>评论区</div>
                    <ul className="index">
                        {this.props.list.result===false?<li>暂无数据</li>:
                            this.props.list.commentList.map(item=>{
                                return(
                                    // 在循环输出子组件的时候一定要加唯一的key属性，key={item.id}
                                    <div style={{marginTop:"10px"}} key={item.id}>
                                        <li style={{marginTop:"5px"}}>
                                            {item.content}
                                        </li>
                                        <div className="author" style={{marginTop:"5px"}}>
                                            <li>
                                                <div style={{width:'180px'}}>
                                                    创建时间 : {item.createTime}
                                                </div>
                                            </li>
                                            <li style={{width:'150px'}}>
                                                <div style={{marginLeft:'20px'}}>
                                                    评论人 : {item.commentator}
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                )
                            })}
                    </ul>
                    {/*<PageButton { ...this.state } pageNext={this.pageNext} />*/}
                </div>
            </div>
        );
    }
}
export default CommentList