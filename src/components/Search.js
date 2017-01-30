import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Icon from './Icon'
import { animate, search } from '../actions'
import '../css/search.css'

// TODO: Refactor into clearer distinction between presentational/container

const Search = ({ dispatch, ui }) => {
  const animation = (
    ui.animate ? (
      ui.show ?
        'container-search animation-open-search' :
        'container-search animation-close-search'
    ) : 'container-search'
  )

	return (
		<div className={animation}>
      <Icon
        callback={() => dispatch(animate('search'))}
        css="icon-search"
        imgSrc="images/search.png"
      />
			<input
        className="input-search"
        type="text"
        onKeyUp={search}
        placeholder="Search Locations"
      />
      <Icon
        callback={() => dispatch(animate('search'))}
        css="icon-search-x"
        imgSrc="images/black-x.png"
      />
		</div>
	)
}

const mapStateToProps = state => ({
  ui: state.ui.search
})

Search.propTypes = {
  ui: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Search)
