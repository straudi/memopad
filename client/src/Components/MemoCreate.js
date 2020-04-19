import React, { Component } from 'react';
import { post } from 'axios';
import qs from 'qs';

class MemoCreate extends Component {
    constructor(props){
        super(props);
        this.state={
            file: null,
            title: '',
            content: '',
            fileName: ''
        }
    }

    inputFormSubmit = (e) => {
        e.preventDefault()
        this.addMemo()
            .then((response) => {
            console.log(response);
            this.props.stateRefresh();
        }) //데이터가 넘어왔을 시에 리프레시
       this.setState({
           file: null,
           title: '',
           content:'',
           fileName: ''
       })
    }

    inputValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value; //사용자가 값 입력한 값이 state에 반영
        this.setState(nextState);
    }  

      handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }  

     addMemo = () => {
        const url = '/api/memos';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
            
        }
        return post(url, formData, config)
    } 

    render() {
        return(
            <div>
                <div>메모입력</div>
                <form onSubmit={this.inputFormSubmit}>
                    <input type="file"  value={this.state.memoImg} file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                    <input type="text" placeholder="제목" name="title" value={this.state.title} onChange={this.inputValueChange}></input>
                    <input type="textarea" placeholder="내용" name="content" value={this.state.content}  onChange={this.inputValueChange}></input>
                <button type="submit">추가</button>
                </form>
                <button>닫기</button>
            </div>
        )
    }
}

export default MemoCreate;