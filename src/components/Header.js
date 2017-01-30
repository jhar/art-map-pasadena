import React from 'react'
import ListButton from './ListButton'
import Search from './Search'
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
