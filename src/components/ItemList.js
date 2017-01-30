import React, { PropTypes } from 'react'
import '../css/list.css'

const ItemList = ({ key, name, selectActive }) => {
  return (
    <div
      className="item-list"
      onClick={selectActive}
      key={key}
    >
      <img className="icon-list" src="images/list-icon.png" />
      <span className="text-list">
        {name}
      </span>
    </div>
  )
}

ItemList.propTypes = {
  key: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  select: React.PropTypes.func.isRequired
}

export default ItemList
