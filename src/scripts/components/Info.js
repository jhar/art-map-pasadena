import React, { Component } from 'react'
import Event from './Event'
import '../../styles/info.css'

const UPCOMING = 'Upcoming Events'
const NOTHING = 'No upcoming events'
const ARROW_LEFT = 'images/arrow-left.png'

export default class Info extends Component {
  state = { previous_location: null }

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
    if (nextProps.activeLocation === null &&
      this.props.activeLocation !== null) {
      this.setState({ previous_location: this.props.activeLocation })
    }
  }

  render() {
    let locCoverSrc, locCoverOff = ''
    let eventsArray = null
    if (this.props.activeLocation !== null) {
      locCoverSrc = this.props.covers[this.props.activeLocation][0].source
      locCoverOff = this.props.covers[this.props.activeLocation][0].offset_y
      eventsArray = this.props.events[this.props.activeLocation]
    } else if (this.state.previous_location !== null) {
      locCoverSrc = this.props.covers[this.state.previous_location][0].source
      locCoverOff = this.props.covers[this.state.previous_location][0].offset_y
      eventsArray = this.props.events[this.state.previous_location]
    }

    let upcomingEvents = ''
    if (eventsArray !== null) {
      upcomingEvents = (eventsArray.length > 0) ? UPCOMING : NOTHING
    }

    let eventItems = ''
    if (eventsArray !== null) {
      eventItems = eventsArray.map((event, index) => {
        let url, oy = ''
        if (this.props.activeLocation !== null) {
          url = this.props.covers[this.props.activeLocation][index+1].source
          oy = this.props.covers[this.props.activeLocation][index+1].offset_y
        } else if (this.state.previous_location !== null) {
          url = this.props.covers[this.state.previous_location][index+1].source
          oy = this.props.covers[this.state.previous_location][index+1].offset_y
        }

        return (
          <Event
            changeOffset = { this.changeOffset }
            src = { url }
            oy = { oy }
            event = { event }
            key = { index }
          />
        )
      })
    }

    return(
			<section className = { this.props.infoClasses } >
				<div className = "arrow-wrap">
					<img
            className = "arrow"
            onClick = { this.props.toggleInfo }
            src = { ARROW_LEFT }
          />
				</div>
				<div className = "cover-outer-container">
					<div className = "cover-inner-container">
						<img
              className = "cover-photo"
              onLoad = { (e) => this.changeOffset(e, locCoverOff, false) }
              src = { locCoverSrc }
              alt = ''
            />
						<div className = "cover-scrim"></div>
						<h1 className = "title">
              { this.props.locationName }
            </h1>
					</div>
				</div>
				<h3 className = "upcoming-events">
          { upcomingEvents }
        </h3>
				<div className = "events-container">
				 { eventItems }
        </div>
			</section>
		)
	}
}
