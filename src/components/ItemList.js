import React, { PropTypes } from 'react'
import { ICON_ITEM_LIST } from '../constants/images'
import '../css/list.css'

const ItemList = ({ key, name, selectActive }) => {
  return (
    <div
      className="item-list"
      onClick={selectActive}
      key={key}
    >
      <img className="icon-list" src={ICON_ITEM_LIST} />
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
