import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import Graph from './components/Graph'
import reducer from './reducers'
import { BrowserRouter, Route } from 'react-router-dom'

import "./main.sass"

const store = createStore(reducer)

render(
  <Provider store={store}>
    <BrowserRouter >
      <Route component={App}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
