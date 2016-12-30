import React, { PropTypes, Component } from 'react'
import '../../styles/list.css'

const ICON = 'images/list-icon.png'

const ListItem = ({key, name, select}) => {
  return (
    <div
      className="list-item"
      onClick={select}
      key={key}
    >
      <img className="list-icon" src={ICON} />
      <span className="list-text">
        {name}
      </span>
    </div>
  )
}

ListItem.propTypes = {
  key: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  select: React.PropTypes.func.isRequired
}

export default ListItem
