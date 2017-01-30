import React, { PropTypes } from 'react'
import ItemList from './ItemList'
import '../css/list.css'

const List = () => {
  const animation = (
    animateList ? (
      showList ?
        'container-list animation-open-list' :
        'container-list animation-close-list'
    ) : 'container-list'
  )
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
				<img className="icon-list" src="images/logout.png" />
				<span className="text-list" onClick={logout} >
          "Logout of Facebook"
        </span>
			</div>
		</nav>
	)
}

export default List
