import React, { PropTypes, Component } from 'react'
import '../../styles/header.css'
import '../../styles/search.css'

const LIST = 'list-toggle'
const LIST_IMG = 'nav-trigger'
const LIST_SRC = 'images/list.png'
const X = 'images/black-x.png'
const SEARCH = 'search-container'
const SEARCH_IMG = 'search-lens'
const SEARCH_SRC = 'images/search.png'
const INPUT = 'search-input'
const PLACEHOLDER = 'Search Locations'
const CLOSE = 'search-close'
const OPENED = 'search-container search-open-animation'
const CLOSED = 'search-container search-close-animation'

export default class Header extends Component {
  state = {
    clicked: false,
    show: false
  }

  toggleSearch = () => {
    this.setState({
      clicked: true,
      show: !this.state.show
    })
  }

	render() {
		return (
			<header>
				<div className = { LIST }>
					<img
            className = { LIST_IMG }
            onClick = { this.props.toggleList }
            src = { this.props.showList ? X : LIST_SRC }
          />
				</div>
				<div
          className = {
            this.state.clicked ? this.state.show ? OPENED : CLOSED : SEARCH
          }
        >
          <img
            className = { SEARCH_IMG }
            onClick = { this.toggleSearch }
            src = { SEARCH_SRC }
          />
					<input
            className = { INPUT }
            type = "text"
            onKeyUp = { this.props.search }
            placeholder = { PLACEHOLDER }
          />
					<img
            className = { CLOSE }
            onClick = { this.toggleSearch }
            src = { X }
          />
				</div>
			</header>
		)
	}
}
