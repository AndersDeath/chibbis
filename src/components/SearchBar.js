import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return  <div className="searchBar">
                <input className="searchBar__input" placeholder="Поиск по комментариями" onChange={this.props.search}/>
              </div>
    }
  }


export default SearchBar;
