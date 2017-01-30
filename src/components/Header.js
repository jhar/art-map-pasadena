import React from 'react'
import ListButton from '../containers/ListButton'
import Search from '../containers/Search'
import '../css/header.css'

const Header = () => {
	return (
		<header>
			<ListButton />
      <Search />
		</header>
	)
}

export default Header
