import React, { Component } from 'react';
import Memo from './Memo';

class MemoList extends Component {
    state = {
        memos : '',
        /* searchKeyword: '' */
    }

    //검색 시 새롭게 랜더링
    stateRefresh() {
        this.setState({
            memos: '',
            searchKeyword: ''
        });
        this.callApi()
            .then(res => this.setState({memos:res})) // restapi 통해서 데이터 받아 데이터 설정 
            .catch(err => console.log(err)); //에러 났을 시에 콘솔에 찍음
    }

    //class 컴포넌트의 생명주기 (컴포넌트 생성 완료)
    componentDidMount(){
        this.callApi()
        .then(res => this.setState({memos:res}))
        .catch(err => console.log(err));
    }

    //class 컴포넌트의 생명주기 (컴포넌트가 DOM 에서 사라진 후 실행 메소드)
    /* componentWillMount() {

    } */

    callApi = async () => {
        const response = await fetch('/api/memos');
        const body = await response.json();
        return body;
    }

    render() {
        return(
            <div>
                <ul>
            {this.state.memos ? this.state.memos.map( c => (            
                <Memo key={c.id} id={c.id} title={c.title} content={c.content} />        
            )) : "" }
             </ul>
            </div>
        )
    }
}

export default MemoList;