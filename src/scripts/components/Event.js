import React, { Component } from 'react'

const DEFAULT = {
  clicked: false,
  show: false
}
// CSS class strings
const UNCLICKED = 'event-description'
const OPENED = 'event-description description-open'
const CLOSED = 'event-description description-close'

export default class Event extends Component {
  state = DEFAULT

  componentWillReceiveProps() {
    this.setState(DEFAULT)
  }

  handleLoad = e => this.props.changeOffset(e, this.props.oY, true)

  toggleDescription = () => {
    this.setState({ clicked: true, show: !this.state.show })
  }

  render() {
    let descriptionClasses = UNCLICKED
    if (this.state.show && this.state.clicked) {
      descriptionClasses = OPENED
    } else if (this.state.clicked) {
      descriptionClasses = CLOSED
    }

    return (
      <div className = "event">
		    <div className = "event-image-container">
			  <img className = "event-image"
             onLoad = { this.handleLoad }
             src = { this.props.src } />
				</div>
				<div className = "event-title-container"
             onClick = { this.toggleDescription } >
				  <h3 className = "event-title">
            { this.props.event.name }
          </h3>
				</div>
				<div className = { descriptionClasses } >
				  <p className = "event-description-text">
            { this.props.event.description }
          </p>
				</div>
			</div>
    )
  }
}
