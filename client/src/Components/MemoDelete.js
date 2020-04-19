import React, { Component } from 'react';

class MemoDelete extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    deleteMemo(id) {
        const url = '/api/memos/'+id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return(
            <button onClick={(e)=>{this.deleteMemo(this.props.id)}}>삭제</button>
        )
    }
}

export default MemoDelete;