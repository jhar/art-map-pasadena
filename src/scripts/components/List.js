import React, { PropTypes, Component } from 'react'

export default class List extends Component {
	render() {
        let listItems = this.props.locations.map((location, index) => {
            return (
                <div className="list-item" key={index}>
                    <img className="list-icon" src="images/list-icon.png" />
                    <span className="list-text">{location.name}</span>
                </div>
            )
        })
		return (
			<nav className={this.props.listClasses}>
				<div className="list-container">
					{listItems}
				</div>
				<div className="list-item fb-auth-out">
					<img className="list-icon" src="images/logout.png" />
					<span className="list-text">Logout of Facebook</span>
				</div>
			</nav>
		)
	}
}

