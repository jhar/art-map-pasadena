import React, { Component } from 'react'
import '../../styles/search.css'

const DEFAULT = 'search-container'
const OPEN = DEFAULT + ' search-open-animation'
const CLOSE = DEFAULT + ' search-close-animation'
const IMG = 'search-lens'
const SRC = 'images/search.png'
const INPUT = 'search-input'
const TYPE = 'text'
const PLACEHOLDER = 'Search Locations'
const X = 'search-close'
const X_SRC = 'images/black-x.png'

export default class Search extends Component {
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
    const css = this.state.clicked ? this.state.show ? OPEN : CLOSE : DEFAULT

		return (
			<div className = { css }>
        <img
          className = { IMG }
          onClick = { this.toggleSearch }
          src = { SRC }
        />
				<input
          className = { INPUT }
          type = { TYPE }
          onKeyUp = { this.props.search }
          placeholder = { PLACEHOLDER }
        />
				<img
          className = { X }
          onClick = { this.toggleSearch }
          src = { X_SRC }
        />
			</div>
		)
	}
}
