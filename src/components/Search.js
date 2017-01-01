import React, { Component, PropTypes } from 'react'
import { BASE_SEARCH, CLOSE_SEARCH, OPEN_SEARCH } from '../constants/animation'
import { ICON_SEARCH, ICON_X } from '../constants/images'
import '../css/search.css'

const Search = ({
  animateSearch,
  search,
  showSearch,
  toggleSearch
}) => {
  const animation = (
    animateSearch ?
      (showSearch ? OPEN_SEARCH : CLOSE_SEARCH) :
      BASE_SEARCH
  )

	return (
		<div className={animation}>
      <img
        className="icon-search"
        onClick={toggleSearch}
        src={ICON_SEARCH}
      />
			<input
        className="input-search"
        type="text"
        onKeyUp={search}
        placeholder="Search Locations"
      />
			<img
        className="icon-search-x"
        onClick={toggleSearch}
        src={ICON_X}
      />
		</div>
	)
}

Search.propTypes = {
  animateSearch: React.PropTypes.bool.isRequired,
  search: React.PropTypes.func.isRequired,
  showSearch: React.PropTypes.bool.isRequired,
  toggleSearch: React.PropTypes.func.isRequired
}

export default Search
