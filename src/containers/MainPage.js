import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { loaderState } from '../actions'
import { Link } from 'react-router-dom'

import Graph from '../components/Graph';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.props.loaderState(true);

    this.maxPartToScreen = 10;
    this.data = [];
    this.dataComment = [];
    this.testCount = 0;
    this.state = {
      commentToShows: [],
      data:[]
    }
  }
  componentWillMount() {
    axios.get('https://arh.chibbistest.ru/api/reviews').then(res => {
      this.data = res.data;
      this.buildData('dateUp');
      this.props.loaderState(false);
    });
  }
  buildData(filter) {
    let data;
    if (filter === 'dateUp') {
      data = Object.assign([], this.data).reverse();
    }
    if (filter === 'dateDown') {
      data = Object.assign([], this.data);
    }
    if (filter === 'ratingUp' || filter === 'ratingDown') {
      data = Object.assign([], this.data).reverse();
      let a = [];
      let b = [];
      for (let i in data) {

        if (data[i].positive === (filter ==='ratingUp')) {
          a.push(data[i]);
        } else {
          b.push(data[i]);
        }
      }
      data = a.concat(b);
    }
    this.setNewData(data);

    this.setState({
      data: data,
      commentToShows: this.dataComment[0].splice(0)
    });
  }

  onScrollList(event) {
    const scrollBottom = event.target.scrollTop +
      event.target.offsetHeight == event.target.scrollHeight;

    if (scrollBottom) {
      let temp = this.state.commentToShows.splice(0);
      if (this.testCount <= this.dataComment.length - 2) {
        this.testCount++;
        this.dataComment[this.testCount].map((item) => {
          temp.push(item);
        });
        this.setState({ commentToShows: temp })
      }

    }
  }
  setNewData(data) {
    this.dataComment = [];
    let counter = 0;
    for (let k in data) {
      if (this.dataComment[counter] === undefined) {
        this.dataComment[counter] = [];
      }
      this.dataComment[counter].push(data[k]);
      if (this.dataComment[counter].length === this.maxPartToScreen) {
        counter++;
      }
    }
    if (this.node) {
      this.node.scrollTop = 0;
    }
    this.testCount = 0;
  }

  filterChange(event) {
    this.buildData(event.target.value);
  }

  search(event) {
    let data = this.state.data.filter(function (item) {
      return item.text.toLowerCase().includes(event.target.value.toLowerCase().trim());
    });
    if (data.length > 0) {
      this.setNewData(data);
      this.setState({
        commentToShows: this.dataComment[0].splice(0)
      });
    }
  }
  render() {
    if (this.state.commentToShows.length === 0) {
      return (<div className="card">У данного места нет отзывов</div>);
    }
    return (
      <div>
        <div className="card">
          <SearchBar search={this.search.bind(this)} />
        </div>
        <div className="card">
          <Filters filterChange={this.filterChange.bind(this)} />
        </div>
        <div className="card" ref={(node) => { this.node = node }} style={{ maxHeight: '400px', overflow: 'auto' }} onScroll={event => this.onScrollList(event)}>
          <div>{this.state.commentToShows.map((item, index) => <ItemCard key={index} item={item} />)} </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    store: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loaderState: (e)=>{
      dispatch(loaderState(e))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

