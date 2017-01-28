import React from 'react'
import ListBtnContainer from './ListBtnContainer'
import Search from './Search'
import '../css/header.css'

const Header = () => {
	return (
		<header>
			<ListBtnContainer />
      <Search />
		</header>
	)
}

export default Header
