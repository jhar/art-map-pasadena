import React, { Component } from 'react'

const DEFAULT = 'event-description'
const OPEN = 'event-description description-open'
const CLOSE = 'event-description description-close'
const STATE_DEFAULT = { clicked: false, show: false }

export default class Event extends Component {
  state = STATE_DEFAULT

  componentWillReceiveProps() {
    this.setState(STATE_DEFAULT)
  }

  handleLoad = e => this.props.changeOffset(e, this.props.offset, true)

  toggleDescription = () => {
    this.setState({ clicked: true, show: !this.state.show })
  }

  render() {
    const css = this.state.clicked ? this.state.show ? OPEN : CLOSE : DEFAULT

    return (
      <div className="event">
		    <div className="event-image-container">
			    <img
            className="event-image"
            onLoad={this.handleLoad}
            src={this.props.src}
          />
				</div>
				<div
          className="event-title-container"
          onClick={this.toggleDescription}
        >
				  <h3 className="event-title">
            {this.props.event.name}
          </h3>
				</div>
				<div className={css}>
				  <p className="event-description-text">
            {this.props.event.description}
          </p>
				</div>
			</div>
    )
  }
}
