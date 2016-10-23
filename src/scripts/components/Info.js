import React, { Component } from 'react'
import Event from './Event'

export default class Info extends Component {
    state = {
        previous_location: null
    }

    changeOffset(e, offset_y, eventCover) {
        let fw, fh
        if (eventCover === true) {
            fw = 826
            fh = 294
        } else {
            fw = 828
            fh = 315
        }

        let nw = e.target.naturalWidth
        let nh = e.target.naturalHeight
        let ow = e.target.offsetWidth
        let oy = offset_y
        let top = (oy * ow / 100) * ((nh / nw) - (fh / fw))
        e.target.style.top = -top + 'px'
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.activeLocation === null) && (this.props.activeLocation !== null)) {
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
        if (eventsArray !== null) upcomingEvents = eventsArray.length > 0 ? 'Upcoming Events' : 'No upcoming events'

        // TODO: Add dates (event.start_time)
        // TODO: Add locations (event.place.location.city,country,state,street,zip) of events
        let eventItems
        if (eventsArray !== null) {
            eventItems = eventsArray.map((event, index) => {
                let evtCoverSrc, evtCoverOff = ''
                if (this.props.activeLocation !== null) {
                    evtCoverSrc = this.props.covers[this.props.activeLocation][index+1].source
                    evtCoverOff = this.props.covers[this.props.activeLocation][index+1].offset_y
                } else if (this.state.previous_location !== null) {
                    evtCoverSrc = this.props.covers[this.state.previous_location][index+1].source
                    evtCoverOff = this.props.covers[this.state.previous_location][index+1].offset_y
                }

                return (
                    <Event  changeOffset={this.changeOffset}
                            evtCoverSrc={evtCoverSrc}
                            evtCoverOff={evtCoverOff}
                            event={event}
                            key={index} />
                )
            })
        } else {
            eventItems = ''
        }

        return(
			<section className={this.props.infoClasses}>
				<div className="arrow-wrap">
					<img className="arrow" onClick={this.props.toggleInfo} src="images/arrow-left.png" />
				</div>
				<div className="cover-outer-container">
					<div className="cover-inner-container">
						<img    className="cover-photo"
                                onLoad={(e) => this.changeOffset(e, locCoverOff, false)}
                                src={locCoverSrc}
                                alt="" />
						<div className="cover-scrim"></div>
						<h1 className="title"></h1>
					</div>
				</div>
				<h3 className="upcoming-events">{upcomingEvents}</h3>
				<div className="events-container">
				    {eventItems}
                </div>
			</section>
		)
	}
}
