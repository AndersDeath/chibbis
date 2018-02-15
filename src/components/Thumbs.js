import React from 'react'

class Thumbs extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.state === true) {
            return <i className = "fas fa-thumbs-up" />
        } else {
            return <i className = "fas fa-thumbs-down" /> 
        }
    }
}


export default Thumbs;