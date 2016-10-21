import React, { Component } from 'react'

export default class Info extends Component {
    state = {
        previous_location: null
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.activeLocation === null) && (this.props.activeLocation !== null)) {
            this.setState({ previous_location: this.props.activeLocation })
        }
    }

	render() {
        let locCoverSrc = ''
        if (this.props.activeLocation !== null) {
            locCoverSrc = this.props.covers[this.props.activeLocation][0].source
        } else if (this.state.previous_location !== null) {
            locCoverSrc = this.props.covers[this.state.previous_location][0].source
        }
        return(
			<section className={this.props.infoClasses}>
				<div className="arrow-wrap">
					<img className="arrow" onClick={this.props.toggleInfo} src="images/arrow-left.png" />
				</div>
				<div className="cover-outer-container">
					<div className="cover-inner-container">
						<img className="cover-photo" src={locCoverSrc} alt="" />
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
