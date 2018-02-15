import React from 'react'
import Thumbs from './Thumbs'

class ItemCard extends React.Component {
  constructor(props) {
    super(props)
  }

  getAnswerText() {
    if (Object.keys(this.props.item.comments) > 0) {
      return this.props.item.comments[Object.keys(this.props.item.comments)[0]].comment;
    } else {
      return ''
    }
  }
  getAnswerDate() {
    if (Object.keys(this.props.item.comments) > 0) {
      return this.props.item.comments[Object.keys(this.props.item.comments)[0]].date;
    } else {
      return ''
    }
  }
  render() {
    return <div>
      <div className="itemCard">
        <div className="itemCard__header">
          {this.props.item.name}
          <div className="itemCard__header--thumbs">
            <Thumbs state={this.props.item.positive} />
          </div>
        </div>
        <div className="itemCard__content">
          <p>{this.props.item.text}</p>
        </div>
        <div className="itemCard__footer">
          {this.props.item.date}
        </div>
      </div>
      <div className="itemCard answer" style={{ display: Object.keys(this.props.item.comments) > 0 ? 'block' : 'none' }}>
        <div className="itemCard__header">
          Ответ заведения
        </div>
        <div className="itemCard__content">
          <p>{
            this.getAnswerText()
          }</p>
        </div>
        <div className="itemCard__footer">
          {this.getAnswerDate()}
        </div>
      </div>
    </div>
  }
}


export default ItemCard;
