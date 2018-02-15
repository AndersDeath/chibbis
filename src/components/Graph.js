import React from 'react'
import axios from 'axios';

import { connect } from 'react-redux'
import { loaderState } from '../actions'

let PieChart = require("react-chartjs").Pie;

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.props.loaderState(true);
    this.chartData = []
    this.state = {
      min: 0,
      max: 0
    }

  }
  componentWillMount() {
    axios.get('https://arh.chibbistest.ru/api/reviews').then(res => {
      let data = res.data;

      let max = [];
      let min = [];
      for (let i in data) {

        if (data[i].positive) {
          max.push(data[i]);
        } else {
          min.push(data[i]);
        }
      }
      this.chartData = [
        {
          value: min.length,
          color: "red",
          label: "Отрицательные"
        },
        {
          value: max.length,
          color: "green",
          label: "Положительные"
        }
      ]
      this.setState({
        min: min.length,
        max: max.length
      })
      this.props.loaderState(false);
    });

  }
  render() {
    return <div className="card pieDiagram">
      <div className="pieDiagram__left">
        <PieChart data={this.chartData} options={{ resonsive: true }} width="300" height="300" />
      </div>
      <div className="pieDiagram__right">
        <div>Положительные: {this.state.max}</div>
        <div>Отрицательные: {this.state.min}</div>
      </div>
    </div>

  }
}



function mapStateToProps(state) {
  return {
    store: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loaderState: (e) => {
      dispatch(loaderState(e))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)


