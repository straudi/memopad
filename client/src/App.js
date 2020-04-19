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

      handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }

    render() {
        return(
            <div>
                <MemoCreate stateRefresh={this.stateRefresh}/>
                <ul>
                {this.state.memos ? this.state.memos.map( c => (            
                    <Memo key={c.id} id={c.id} image={c.image} title={c.title} content={c.content}/>        
                )) : "" }
                </ul>
            </div>
        )
    }
}

export default App;