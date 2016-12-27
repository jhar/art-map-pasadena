import React, { Component } from 'react'
import Event from './Event'
import '../../styles/info.css'

const UPCOMING = 'Upcoming Events'
const NOTHING = 'No upcoming events'
const ARROW_LEFT = 'images/arrow-left.png'

export default class Info extends Component {
  state = { last: null }

  changeOffset(e, oy, evt) {
    const fw = evt ? 826 : 828
    const fh = evt ? 294 : 315
    const nw = e.target.naturalWidth
    const nh = e.target.naturalHeight
    const ow = e.target.offsetWidth
    const top = (oy * ow / 100) * ((nh / nw) - (fh / fw))
    e.target.style.top = -top + 'px'
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === null && this.props.active !== null) {
      this.setState({ last: this.props.active })
    }
  }

  getProp = (i, prop) => {
    return (
      this.props.active !== null ?
        this.props.covers[this.props.active][i][prop] :
        this.state.last !== null ?
          this.props.covers[this.state.last][i][prop] :
          ''
    )
  }

  render() {
    const p = this.props
    const s = this.state

    let locOffset = ''
    let evtArr = null
    if (p.active !== null) {
      evtArr = p.events[p.active]
    } else if (s.last !== null) {
      evtArr = p.events[s.last]
    }

    let evtItems = ''
    if (evtArr !== null) {
      evtItems = evtArr.map((event, index) => {
        return (
          <Event
            changeOffset={this.changeOffset}
            src={this.getProp(index + 1, 'source')}
            offset={this.getProp(index + 1, 'offset_y')}
            event={event}
            key={index}
          />
        )
      })
    }

    return(
			<section className={p.infCss}>
				<div className="arrow-wrap">
					<img
            className="arrow"
            onClick={p.infToggle}
            src={ARROW_LEFT}
          />
				</div>
				<div className="cover-outer-container">
					<div className="cover-inner-container">
						<img
              className="cover-photo"
              onLoad = {(e) => this.changeOffset(e, locOffset, false)}
              src={this.getProp(0, 'source')}
              alt=""
            />
						<div className="cover-scrim"></div>
						<h1 className="title">
              {p.locationName}
            </h1>
					</div>
				</div>
				<h3 className="upcoming-events">
          {(evtArr && evtArr.length > 0) ? UPCOMING : NOTHING}
        </h3>
				<div className="events-container">
				 {evtItems}
        </div>
			</section>
		)
	}
}
