import React, { Component, PropTypes } from 'react'
import '../../styles/search.css'

const DEFAULT = 'search-container'
const OPEN = 'search-container search-open-animation'
const CLOSE = 'search-container search-close-animation'

const Search = ({ clicked, search, show, toggle }) => {
  const css = clicked ? show ? OPEN : CLOSE : DEFAULT

	return (
		<div className={css}>
      <img
        className="search-lens"
        onClick={toggle}
        src="images/search.png"
      />
			<input
        className="search-input"
        type="text"
        onKeyUp={search}
        placeholder="Search Locations"
      />
			<img
        className="search-close"
        onClick={toggle}
        src="images/black-x.png"
      />
		</div>
	)
}

Search.propTypes = {
  clicked: React.PropTypes.bool.isRequired,
  search: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired
}

export default Search
