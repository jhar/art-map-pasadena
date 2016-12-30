import mori from 'mori'
import React, { PropTypes, Component } from 'react'
import ListItem from './ListItem'
import '../../styles/list.css'

const CLOSE = 'list-view list-view-close'
const DEFAULT = 'list-view'
const LOGOUT_ICON = 'images/logout.png'
const LOGOUT_TXT = 'Logout of Facebook'
const OPEN = 'list-view list-view-open'

const List = ({clicked, logout, places, select, show}) => {
  const css = clicked ? show ? OPEN : CLOSE : DEFAULT
  const listItems = places.map((place, index) => {
    if (place.visible !== false) {
      <ListItem
        key={place.id}
        name={place.name}
        select={() => select(index)}
      />
    }
  })

	return (
		<nav className={css}>
			<div className="list-container">
				{listItems}
			</div>
			<div className="list-item fb-auth-out">
				<img className="list-icon" src={LOGOUT_ICON} />
				<span
          className="list-text"
          onClick={logout}
        >
          {LOGOUT_TXT}
        </span>
			</div>
		</nav>
	)
}

List.propTypes = {
  clicked: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  select: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired
}

export default List
