import React from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'
import Graph from './Graph'
import MainPage from '../containers/MainPage'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="mainNav card">
          <ul>
            <li className="mainNav__item"><Link to="/">Отзывы</Link></li>
            <li className="mainNav__item"><Link to="/graph">Диаграмма</Link></li>
          </ul>
          <span className="loader" style={{
              display: this.props.store.loaderReducer ? 'block' : 'none'
            }}>Загрузка...</span>
        </div>
        <div>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/graph' component={Graph} />
          </Switch>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    store: state
  }
}

App = connect(mapStateToProps)(App)

export default App;