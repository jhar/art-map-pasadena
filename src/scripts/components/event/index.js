import React, { Component } from 'react'
import { DEFAULT, OPEN, CLOSE, STATE_DEFAULT } from './constants'
import './style.css'

export default class Event extends Component {
  state = STATE_DEFAULT

  componentWillReceiveProps() {
    this.setState(STATE_DEFAULT)
  }

  handleLoad = e => this.props.changeOffset(e, this.props.offset, true)

  descToggle = () => {
    this.setState({ clicked: true, show: !this.state.show })
  }

  render() {
    const t = this
    const css = t.state.clicked ? t.state.show ? OPEN : CLOSE : DEFAULT

    return (
      <div className="event">
		    <div className="event-image-container">
			    <img
            className="event-image"
            onLoad={t.handleLoad}
            src={t.props.src}
          />
				</div>
				<div
          className="event-title-container"
          onClick={t.descToggle}
        >
				  <h3 className="event-title">
            {t.props.event.name}
          </h3>
				</div>
				<div className={css}>
				  <p className="event-description-text">
            {t.props.event.description}
          </p>
				</div>
			</div>
    )
  }
}
