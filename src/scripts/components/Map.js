import React, { PropTypes, Component } from 'react'

export default class Map extends Component {
	render() {
		return (
			<section className="map-container">
				<div>
					An error with Google Maps occurred and the page may not be displaying correctly. Please refresh or try again later.
				</div>
				<div id="map"></div>
			</section>
		)
	}
}