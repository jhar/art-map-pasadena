import React, { PropTypes, Component } from 'react'

export default class List extends Component {
	render() {
		return (
			<nav className="list-view">
				<div className="list-container">
					<div className="list-item">
						<img className="list-icon" src="images/list-icon.png" />
						<span className="list-text"></span>
					</div>
				</div>
				<div className="list-item fb-auth-out">
					<img className="list-icon" src="images/logout.png" />
					<span className="list-text">Logout of Facebook</span>
				</div>
			</nav>
		)
	}
}

