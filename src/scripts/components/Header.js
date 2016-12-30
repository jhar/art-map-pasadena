import React, { Component, PropTypes } from 'react'
import Search from './Search'
import '../../styles/header.css'

const LIST_URL = 'images/list.png'
const X_URL = 'images/black-x.png'

const Header = ({ search, searchToggle, searchUI, show, toggle }) => {
	return (
		<header>
			<div className="list-toggle">
				<img
          className="nav-trigger"
          onClick={toggle}
          src={show ? X_URL : LIST_URL}
        />
			</div>
      <Search
        clicked={searchUI.clicked}
        search={search}
        show={searchUI.show}
        toggle={searchToggle}
      />
		</header>
	)
}

Header.propTypes = {
  search: React.PropTypes.func.isRequired,
  searchToggle: React.PropTypes.func.isRequired,
  searchUI: React.PropTypes.object.isRequired,
  show: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired
}

export default Header
