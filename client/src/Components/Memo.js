import React, { Component } from 'react';
import MemoDelete from './MemoDelete';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MemoList = styled.li `
   .date {
    text-align: right;
   }
    position:relative;
`;

const ImportBtn = styled.button`
    border:none;
    background-color:transparent;
    position: absolute;
    top: 20px;
    right: 20px;
`;

const Imgbox = styled.div`
    height: 250px;
    overflow: hidden;
`;

const TextBox = styled.div`
    height:100px;
`;

class Memo extends Component {

    onToggle(id,data) {
        const importYn = data === 1 ? 0 : 1;
        const url = '/api/memos/'+id;
        fetch(url, {
            method : 'put',
            body : JSON.stringify({importYn : importYn}),
            headers: { 'Content-type': 'application/json' }
        });
       this.props.stateRefresh();
    }

    render() {
        
        return (
            <MemoList>
                <ImportBtn onClick={(e)=>{this.onToggle(this.props.id, this.props.importYn)}}>
                    <FontAwesomeIcon icon={faStar} size="2x" color={this.props.importYn === 1 ? "yellow" : "black"} />
                </ImportBtn>
                <Imgbox>
                    <img src={this.props.image} alt={this.props.title} style={{width:"200px"}} />
                </Imgbox>
                <TextBox>
                    <div>타이틀:{this.props.title}</div>
                    <div>내용:{this.props.content.length > 18 ? `${this.props.content.substring(0,18)}...`: this.props.content}</div>
                    <div className="date">{(this.props.dateCreated).substring(0,10)}</div>
                    <MemoDelete stateRefresh={this.props.stateRefresh} id={this.props.id} />
                </TextBox>
         </MemoList>
        )
    }
}

export default Memo;