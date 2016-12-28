import React, { Component } from 'react'
import Event from './event'
import '../../styles/info.css'

const UPCOMING = 'Upcoming Events'
const NOTHING = 'No upcoming events'

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
    const locOffset = this.getProp(0, 'offset_y') || ''
    const evtArr = (
      p.active !== null ?
        p.events[p.active] :
        s.last !== null ? p.events[s.last] : null
    )

    const evtItems = evtArr === null ? '' : evtArr.map((event, index) => {
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

    return(
			<section className={p.infCss}>
				<div className="arrow-wrap">
					<img
            className="arrow"
            onClick={p.infToggle}
            src="images/arrow-left.png"
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
