import React, { Component } from 'react';
import Memo from './Components/Memo';
import MemoCreate from './Components/MemoCreate';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          memos: '',
          searchKeyword: ''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this); 
      }

    //새롭게 랜더링
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

    callApi = async () => {
        const response = await fetch('/api/memos');
        const body = await response.json();
        return body;
      }

      handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }

    render() {
        const filterdMemoList = (data) => {
            data = data.filter((c) => {
                return c.title.indexOf(this.state.searchKeyword)>-1;
            });
            return data.map((c) => {
                return  <Memo stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} title={c.title} content={c.content}/>  
            });
        }

        return(
            <div>
                <MemoCreate stateRefresh={this.stateRefresh}/>
                <input placeholder="검색하기" name="searchKeyword" value={this.state.searchKeyword} onChange={this.handleValueChange}></input>
                <ul>
                {this.state.memos ? filterdMemoList(this.state.memos) : <div>불러올 메모가 없습니다</div> }
                </ul>
            </div>
        )
    }
}

export default App;