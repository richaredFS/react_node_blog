import React from 'react';
// let editor = require('externalLib/wangEditor-3.0.8');
// import Editor from 'externalLib/wangEditor-3.0.8/src/js/editor/index'

class Me extends React.Component{
    constructor(props) {
        super(props);
        this.state={}
    }
    componentWillMount(){
        setTimeout(()=>{
            console.log("render之前执行")
        },10000)
    }
    componentDidMount(){
        // setTimeout(()=>{
        //     console.log("render之后执行")
        // },5000)
        console.log("render之后执行")
    }
    handleEditorChange=(e)=>{
        console.log(e.target.getContent());
    }

    render() {
        return (
            <div>
                开发中，尽情期待！
                {/*<Editor id="editor1" content="<p>在react中使用wangEditor</p>"/>,*/}
            </div>
        );
    }
}
export default Me;
