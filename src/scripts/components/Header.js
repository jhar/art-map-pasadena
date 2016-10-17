import React, { PropTypes, Component } from 'react'

export default class Header extends Component {
	render() {
		return (
			<header>
				<div className="list-toggle">
					<img className="nav-trigger" src="images/list.png" />
				</div>
				<div className="search-container">
					<img className="search-lens" src="images/search.png" />
					<input className="search-input" type="text" placeholder="Search Locations" />
					<img className="search-close" src="images/black-x.png" />
				</div>
			</header>
		)
	}
}