import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TriggerList from '../components/TriggerList'
import Search from '../components/Search'
import { search, toggleList, toggleSearch } from '../actions'
import '../css/header.css'

const Header = ({
  animateSearch,
  search,
  showList,
  showSearch,
  toggleList,
  toggleSearch
}) => {
	return (
		<header>
			<TriggerList
        showList={showList}
        toggleList={toggleList}
      />
      <Search
        animateSearch={animateSearch}
        search={search}
        showSearch={showSearch}
        toggleSearch={toggleSearch}
      />
		</header>
	)
}

Header.propTypes = {
  showList: React.PropTypes.bool.isRequired,
  search: React.PropTypes.func.isRequired,
  searchClicked: React.PropTypes.bool.isRequired,
  searchShow: React.PropTypes.bool.isRequired,
  toggleList: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  animateSearch: state.animateSearch,
  showList: state.showList,
  showSearch: state.showSearch
})

const mapDispatchToProps = dispatch => ({
  search: bindActionCreators(search, dispatch),
  toggleList: bindActionCreators(toggleList, dispatch),
  toggleSearch: bindActionCreators(toggleSearch, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
