import React, { PropTypes } from 'react'
import { BASE_SEARCH, CLOSE_SEARCH, OPEN_SEARCH } from '../constants/animation'
import { ICON_SEARCH, ICON_X } from '../constants/images'
import '../css/search.css'

const Search = ({ animate, search, uiSearch }) => {
  const animation = (
    uiSearch.animate ?
      (uiSearch.show ? OPEN_SEARCH : CLOSE_SEARCH) :
      BASE_SEARCH
  )

	return (
		<div className={animation}>
      <img
        className="icon-search"
        onClick={() => animate('search')}
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
        onClick={() => animate('search')}
        src={ICON_X}
      />
		</div>
	)
}

Search.propTypes = {
  animate: React.PropTypes.func.isRequired,
  search: React.PropTypes.func.isRequired,
  uiSearch: React.PropTypes.object.isRequired
}

export default Search
