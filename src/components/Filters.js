import React from 'react'

class Filters extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return  <div>
                Фильтры:
                <select onChange={this.props.filterChange}>
                    <option value="dateUp">По дате (по убыванию)</option>
                    <option value="dateDown">По дате (по возрастанию)</option>
                    <option value="ratingUp">По рейтингу (сначала хорошие)</option>
                    <option value="ratingDown">По рейтингу (сначала плохие)</option>
                </select>
              </div>
    }
  }


export default Filters;
