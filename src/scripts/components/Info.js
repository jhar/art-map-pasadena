import React, { PropTypes, Component } from 'react'

export default class Info extends Component {
	render() {
		return(
			<section className="info-view">
				<div className="arrow-wrap">
					<img className="arrow" src="images/arrow-left.png" />
				</div>
				<div className="fb-error display-none">
					An error with Facebook occurred and the page may not be displaying correctly. Please refresh or try again later.
				</div>
				<div className="cover-outer-container">
					<div className="cover-inner-container">
						<img className="cover-photo" alt="" />
						<div className="cover-scrim"></div>
						<h1 className="title"></h1>
					</div>
				</div>
				<h3 className="upcoming-events"></h3>
				<div className="events-container">
					<div className="event">
						<div className="event-image-container">
							<img className="event-image" />
						</div>
						<div className="event-title-container">
							<h3 className="event-title"></h3>
						</div>
						<div className="event-description">
							<p className="event-description-text"></p>
						</div>
					</div>
				</div>
			</section>
		)
	}
}