import React, { PropTypes } from 'react'
import { ICON_LIST, ICON_X } from '../constants/images'
import '../css/triggerList.css'

const TriggerList = ({ showList, toggleList }) => {
  return (
    <div className="container-trigger-list">
      <img
        className="icon-trigger-list"
        onClick={toggleList}
        src={showList ? ICON_X : ICON_LIST}
      />
    </div>
  )
}

TriggerList.propTypes = {
  showList: React.PropTypes.func.isRequired,
  toggleList: React.PropTypes.bool.isRequired
}

export default TriggerList
