import React, { PropTypes } from 'react'
import Event from './Event'
import { BASE_INFO, CLOSE_INFO, OPEN_INFO } from '../constants/animation'
import { ICON_ARROW_LEFT } from '../constants/images'
import { H3_INFO_0, H3_INFO_1 } from '../constants/text'
import '../css/info.css'

const Info = ({ animateInfo, showInfo, toggleInfo }) => {
  const oy = place.cover.offset_y
  const animation = animateInfo ? showInfo ? OPEN_INFO : CLOSE_INFO : BASE_INFO
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
		<section className={animation}>
			<div className="arrow-wrap">
				<img
          className="arrow"
          onClick={toggle}
          src={ICON_ARROW_LEFT}
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
        {(events && events.length > 0) ? H3_INFO_1 : H3_INFO_0}
      </h3>
			<div className="events-container">
			 {events}
      </div>
		</section>
	)
}

Info.propTypes = {
  animateInfo: React.PropTypes.bool.isRequired,
  showInfo: React.PropTypes.bool.isRequired,
  toggleInfo: React.PropTypes.func.isRequired
}

export default Info
