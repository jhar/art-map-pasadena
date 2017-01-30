import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Event from './Event'
import '../css/info.css'

const Info = ({ active, dispatch, events, places }) => {
  const oy = active.cover.offset_y

  const animation = (
    animateInfo ? (
      showInfo ?
        'container-info animation-open-info' :
        'container-info animation-close-info'
    ) : 'container-info'
  )

  const upcomingEvents = active.events.data.map((event) => {
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
		<section className={animation}>
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
            src={active.cover.source}
            alt=""
          />
					<div className="cover-scrim"></div>
					<h1 className="title">
            {name}
          </h1>
				</div>
			</div>
			<h3 className="upcoming-events">
        {events && events.length > 0 ? 'Upcoming Events' : 'No Upcoming Events'}
      </h3>
			<div className="events-container">
			 {upcomingEvents}
      </div>
		</section>
	)
}

const mapStateToProps = state => ({
  active: state.active,
  events: state.events,
  places: state.places
})

Info.propTypes = {
  active: React.PropTypes.number,
  events: React.PropTypes.object,
  places: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Info)
