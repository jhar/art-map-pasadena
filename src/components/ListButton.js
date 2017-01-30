import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Icon from './Icon'
import { animate } from '../actions'
import '../css/listBtn.css'

const ListButton = ({ dispatch, uiListOpen }) => {
  return (
    <div className="container-list-btn">
      <Icon
        callback={() => dispatch(animate('list'))}
        css="icon-list-btn"
        imgSrc={uiListOpen ? 'images/black-x.png' : 'images/list.png'}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  uiListOpen: state.ui.list.open
})

ListButton.propTypes = {
  uiListOpen: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(ListButton)
