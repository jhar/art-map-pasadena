import React, { Component, PropTypes } from 'react'
import Search from './Search'
import '../../styles/header.css'

const LST_URL = 'images/list.png'
const X_URL = 'images/black-x.png'

function Header({ lstToggle, lstShow, search }) {
	return (
		<header>
			<div className="list-toggle">
				<img
          className="nav-trigger"
          onClick={lstToggle}
          src={lstShow ? X_URL : LST_URL}
        />
			</div>
      <Search search={search} />
		</header>
	)
}

Header.propTypes = {
  lstToggle: React.PropTypes.func,
  lstShow: React.PropTypes.bool,
  search: React.PropTypes.func
}

export default Header
