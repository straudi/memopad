import React, { Component } from 'react';
import { post } from 'axios';
import styled from 'styled-components';

const CreateBox = styled.div`
    vertical-align: top;
    width: 95%;
    margin-left: 2%;
`;

const CreateTemplate = styled.div`
    h4 {text-align: center;}
    background-color: #FBFFB9;
    width: 100%;
    button{
        display:block;
        border: none;
        width: 60px;
        height: 30px;
        border-radius: 5px;
        background-color: #F6B352;
        margin-top: 15px;
        margin: 15px auto;
    }
    form {
        text-align: center;
        padding: 1% 0;
}
`;

const InputText = styled.input`
    width: 80%;
    margin: 0 auto; 
    border: none;
`;

const TextArea = styled.input`
    width: 80%;
    height: 20px;
    border: none;
`;

class MemoCreate extends Component {
    constructor(props){
        super(props);
        this.state={
            file: null,
            title: '',
            content: '',
            fileName: '',
            error : '',
        }
    }

    validation = () => {
        if (!this.state.fileName) {
          this.setState({error:"file Error"})
          return false;
        }
        if (!this.state.title) {
          this.setState({error:"title Error"})
          return false;
        }
        if (!this.state.content) {
          this.setState({error:"content Error"})
          return false;
        }
        return true;
      };

    inputFormSubmit = (e) => {
        e.preventDefault();
        const valid = this.validation();
        if (!valid) {
            console.log("error", this.state);
            if(this.state.error)alert(`${this.state.error}`);
            console.log(this.state.error);
            return;
        }
        this.addMemo()
            .then((response) => {
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
            <CreateBox>
                <CreateTemplate>
                    <h4>메모입력</h4>
                    <form onSubmit={this.inputFormSubmit}>
                        <label htmlFor="file">사진업로드</label>
                        <input type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                        <InputText type="text" placeholder="제목" name="title" value={this.state.title} onChange={this.inputValueChange}></InputText>
                        <TextArea type="textarea" placeholder="내용" name="content" value={this.state.content}  onChange={this.inputValueChange}></TextArea>
                        <button type="submit" >추가</button>
                    </form>
                </CreateTemplate>
            </CreateBox>
        )
    }
}

export default MemoCreate;