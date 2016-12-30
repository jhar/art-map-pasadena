import React, { Component } from 'react'
import Event from './event'
import '../../styles/info.css'

const CLOSE = 'info-view info-animate-left'
const DEFAULT = 'info-view'
const NOTHING = 'No upcoming events'
const OPEN = 'info-view info-animate-right'
const UPCOMING = 'Upcoming Events'

function getTop(e, oy, isEvent) {
  const [fw, fh] = isEvent ? [826, 294] : [820, 312]
  const nw = e.target.naturalWidth
  const nh = e.target.naturalHeight
  const ow = e.target.offsetWidth
  return (oy * ow / 100) * ((nh / nw) - (fh / fw)) * -1
}

const Info = ({ clicked, place, show, toggle }) => {
  const oy = place.cover.offset_y
  const css = clicked ? show ? OPEN : CLOSE : DEFAULT
  const events = place.events.data.map((event) => {
    return (
      <Event
        description={event.description}
        getTop={getTop}
        key={event.id}
        name={event.name}
        offset={event.cover.offset_y}
        src={event.cover.source}
      />
    )
  })

  return(
		<section className={css}>
			<div className="arrow-wrap">
				<img
          className="arrow"
          onClick={toggle}
          src="images/arrow-left.png"
        />
			</div>
			<div className="cover-outer-container">
				<div className="cover-inner-container">
					<img
            className="cover-photo"
            onLoad={(e) => e.target.style.top = getTop(e, oy, false) + 'px'}
            src={place.cover.source}
            alt=""
          />
					<div className="cover-scrim"></div>
					<h1 className="title">
            {name}
          </h1>
				</div>
			</div>
			<h3 className="upcoming-events">
        {(events && events.length > 0) ? UPCOMING : NOTHING}
      </h3>
			<div className="events-container">
			 {events}
      </div>
		</section>
	)
}

Info.propTypes = {
  clicked: React.PropTypes.bool.isRequired,
  place: React.PropTypes.object,
  show: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired
}

export default Info
