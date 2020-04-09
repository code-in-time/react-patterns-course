import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import App from './App'

const GlobalStyle = createGlobalStyle`
*,
*:before,
*:after {
    box-sizing: border-box;
}

  body {
    padding: 0;
    margin: 0;
    color: #b2bbc8;
    fontFamily: Avenir, Nunito, sans-serif;
    fontSize: 16px;
    fontWeight: 500;
  }

`

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)
