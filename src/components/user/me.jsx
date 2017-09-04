import React from 'react';
import {Editor, EditorState} from 'draft-js';
//富文本编辑器的样式文件
import 'draft-js/dist/Draft.css'
class Me extends React.Component{
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }
    render() {
        return (
            <div>
                开发中，尽情期待！
            </div>
        );
    }
}
export default Me;