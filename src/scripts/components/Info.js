import React, { Component } from 'react'

class Event extends Component {
    state = {
        description_clicked: false,
        show_description: false
    }

    componentWillReceiveProps() {
        this.setState({
            description_clicked: false,
            show_description: false
        })
    }
    
    toggleDescription = () => {
        this.setState({ 
            description_clicked: true,
            show_description: !this.state.show_description
        })
    }

    render() {
        let descriptionClasses = 'event-description'
        if (this.state.show_description && this.state.description_clicked) {
            descriptionClasses = 'event-description description-open'
        } else if (this.state.description_clicked) {
            descriptionClasses = 'event-description description-close'
        }

        return (
            <div className="event">
			    <div className="event-image-container">
				    <img className="event-image" src={this.props.evtCoverSrc} />
				</div>
				<div className="event-title-container" onClick={this.toggleDescription}>
				    <h3 className="event-title">{this.props.event.name}</h3>
				</div>
				<div className={descriptionClasses}>
				    <p className="event-description-text">{this.props.event.description}</p>
				</div>
			</div>
        )
    }
}

export default class Info extends Component {
    state = {
        previous_location: null
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.activeLocation === null) && (this.props.activeLocation !== null)) {
            this.setState({ previous_location: this.props.activeLocation })
        } else {
            this.setState({ viewable_descriptions: []})
        }
    }

	render() {
        let locCoverSrc = ''
        let eventsArray = null
        if (this.props.activeLocation !== null) {
            locCoverSrc = this.props.covers[this.props.activeLocation][0].source
            eventsArray = this.props.events[this.props.activeLocation]
        } else if (this.state.previous_location !== null) {
            locCoverSrc = this.props.covers[this.state.previous_location][0].source
            eventsArray = this.props.events[this.state.previous_location]
        }

        let upcomingEvents = ''
        if (eventsArray !== null) upcomingEvents = eventsArray.length > 0 ? 'Upcoming Events' : 'No upcoming events' 

        // TODO: Add dates (event.start_time)
        // TODO: Add locations (event.place.location.city,country,state,street,zip) of events
        let eventItems
        if (eventsArray !== null) {
            eventItems = eventsArray.map((event, index) => {
                let evtCoverSrc = ''
                if (this.props.activeLocation !== null) {
                    evtCoverSrc = this.props.covers[this.props.activeLocation][index+1].source
                } else if (this.state.previous_location !== null) {
                    evtCoverSrc = this.props.covers[this.state.previous_location][index+1].source
                }

                return (
                    <Event evtCoverSrc={evtCoverSrc} event={event} key={index} />
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
						<img className="cover-photo" src={locCoverSrc} alt="" />
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
