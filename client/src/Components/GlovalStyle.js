import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        background: #e9ecef;
        font-family: 'Noto Sans KR','Muli', serif;
        padding:0; 
        margin:0;
        box-sizing: border-box;
    }

    ol,li {
        list-style: none;
    }
`;

class GlobalStyle extends Component {
    render(){
        return(
            <GlobalStyles/>
        )
    }
}

export default GlobalStyle;