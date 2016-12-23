import React, { Component } from 'react'
import Search from './Search'
import '../../styles/header.css'

const LIST = 'list-toggle'
const IMG = 'nav-trigger'
const SRC = 'images/list.png'
const X_SRC = 'images/black-x.png'

export default class Header extends Component {
	render() {
		return (
			<header>
				<div className = { LIST }>
					<img
            className = { IMG }
            onClick = { this.props.toggleList }
            src = { this.props.showList ? X_SRC : SRC }
          />
				</div>
        <Search search = { this.props.search }/>
			</header>
		)
	}
}
