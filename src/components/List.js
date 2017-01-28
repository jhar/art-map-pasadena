import React, { PropTypes } from 'react'
import ItemList from './ItemList'
import {
  BASE_LIST,
  CLOSE_LIST,
  OPEN_LIST
} from '../constants/animation'
import { ICON_LOGOUT } from '../constants/images'
import '../css/list.css'

const List = () => {
  const animation = animateList ? showList ? OPEN_LIST : CLOSE_LIST : BASE_LIST
  const itemsList = places.map((place, index) => {
    if (place.visible !== false) {
      <ItemList
        key={place.id}
        name={place.name}
        select={selectActive}
      />
    }
  })

	return (
		<nav className={animation}>
			<div>
				{itemsList}
			</div>
			<div className="item-list">
				<img className="icon-list" src={ICON_LOGOUT} />
				<span className="text-list" onClick={logout} >
          "Logout of Facebook"
        </span>
			</div>
		</nav>
	)
}

export default List
