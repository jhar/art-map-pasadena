import React, { PropTypes } from 'react'
import '../css/listBtn.css'

const ListBtn = ({ animate, uiListOpen }) => {
  return (
      <img
        className="icon-list-btn"
        onClick={animate}
        src={uiList ? 'images/black-x.png' : 'images/list.png'}
      />
  )
}

ListBtn.propTypes = {
  animate: React.PropTypes.func.isRequired,
  uiListOpen: React.PropTypes.bool.isRequired
}

export default ListBtn
