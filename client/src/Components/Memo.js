import React, { Component } from 'react';
import MemoDelete from './MemoDelete';

class Memo extends Component {

    onToggle(id) {
       const url = '/api/memos/'+id;
       fetch(url, {
           method : 'put'
       });
       this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <div>{this.props.id}</div>
                <div><img src={this.props.image} alt={this.props.title}></img></div>
                <div type="text" value={this.props.title}>타이틀:{this.props.title}</div>
                <div type="textarea" value={this.props.content}>내용:{this.props.content}</div>
                <MemoDelete stateRefresh={this.props.stateRefresh} id={this.props.id}>삭제</MemoDelete>
                <button onClick={(e)=>{this.onToggle(this.props.id)}}>수정</button>
            </div>
        )
    }
}

export default Memo;