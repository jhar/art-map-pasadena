import React, { PropTypes, Component } from 'react'

import '../../styles/list.css'

export default class List extends Component {
	render() {
        let listItems = this.props.locations.map((location, index) => {
            if (location.visibility !== false) {
                return (
                    <div className="list-item" onClick={() => {this.props.selectActive(index)}} key={index}>
                        <img className="list-icon" src="images/list-icon.png" />
                        <span className="list-text">{location.name}</span>
                    </div>
                )
            }
        })
		return (
			<nav className={this.props.listClasses}>
				<div className="list-container">
					{listItems}
				</div>
				<div className="list-item fb-auth-out">
					<img className="list-icon" src="images/logout.png" />
					<span className="list-text" onClick={() => this.props.toggleLogin(true)}>Logout of Facebook</span>
				</div>
			</nav>
		)
	}
}

