import React, { Component } from 'react';
import Memo from './Components/Memo';
import MemoCreate from './Components/MemoCreate';
import styled  from 'styled-components';
import GlobalStyle from './Components/GlovalStyle';

const Header = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    background: #a79c8e;
        h4 {
            font-size: 1.8rem;
        }

        div {
            width: 50%;
            display:flex;
            align-items: center;
            justify-content: center;
        }
`;

const Input = styled.input`
    transition: width .35s linear;
    outline : none;
    border: none;
    border-radius : 4px;
    padding: 10px;
    font-size: 20px;
    width: 20%;
    background-color: #ddd;
    height : 35%;
    
    &.input-focused{
        width: 240px;
    }
`; 

const MemoList = styled.div`
    display: inline-block;
    ul {
        display:flex;
        flex-wrap: wrap;
    }
    li{
        padding:20px;
    }
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          memos: '',
          searchKeyword: '',
          focused: false
        }
      }
    ;
    //새롭게 랜더링
    stateRefresh = () => {
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
        this.input.addEventListener('focus', this.focus);
        this.input.addEventListener('blur', this.focus);
        this.callApi()
        .then(res => this.setState({memos:res}))
        .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/memos');
        const body = await response.json();
        return body;
      }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    focus = () => {
        this.setState((state) => ({focused: !state.focusd}))
    }

    render() {
        const filterdMemoList = (data) => {
            data = data.filter((c) => {
                return c.title.indexOf(this.state.searchKeyword)>-1;
            });
            return data.map((c) => {
                return <Memo stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} title={c.title} content={c.content} dateCreated={c.dateCreated} importYn={c.importYn}/>  
            });
        }

        return(
            <>
                <GlobalStyle />
                <Header>
                    <div>
                        <h4>MEMO PAD</h4>
                    </div>
                    <div>
                        <Input ref={input => this.input = input} className={['input', this.state.focused && 'input-focused'].join(' ')} 
                        name="searchKeyword" value={this.state.searchKeyword} onChange={this.handleValueChange} placeholder="타이틀 검색"></Input>
                    </div>
                </Header>
                <section>
                    <MemoCreate stateRefresh={this.stateRefresh}/>
                    <MemoList>
                        <ul>
                            {this.state.memos ? filterdMemoList(this.state.memos) : <div>불러올 메모가 없습니다.</div> }
                        </ul>
                    </MemoList>
                </section>
            </>
        )
    }
}

export default App;