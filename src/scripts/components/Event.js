import React, { Component } from 'react'

export default class Event extends Component {
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
				    <img    className="event-image"
                            onLoad={(e) => this.props.changeOffset(e, this.props.evtCoverOff, true)}
                            src={this.props.evtCoverSrc} />
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
