import React, { PropTypes, Component } from 'react'

export default class Header extends Component {
    state = {
        search_clicked: false,
        show_search: false
    }
    toggleSearch = () => {
        this.setState({ show_search: !this.state.show_search, search_clicked: true })
    }
	render() {
        let toggleSrc = this.props.showList ? 'images/black-x.png' : 'images/list.png'
        let searchClasses = 'search-container'
        if (this.state.show_search && this.state.search_clicked) {
            searchClasses = 'search-container search-open-animation'
        } else if (this.state.search_clicked) {
            searchClasses = 'search-container search-close-animation'
        }
		return (
			<header>
				<div className="list-toggle">
					<img className="nav-trigger" onClick={this.props.toggleList} src={toggleSrc} />
				</div>
				<div className={searchClasses}>
                    <img className="search-lens" onClick={this.toggleSearch} src="images/search.png" />
					<input className="search-input" type="text" onKeyUp={this.props.liveSearch} placeholder="Search Locations" />
					<img className="search-close" onClick={this.toggleSearch} src="images/black-x.png" />
				</div>
			</header>
		)
	}
}
