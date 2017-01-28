import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ListBtn from './ListBtn'
import { animate } from '../actions'
import '../css/listBtn.css'

const ListBtnContainer = ({ dispatch, uiListOpen }) => {
  return (
    <div className="container-list-btn">
      <ListBtn
        animate={() => dispatch(animate('list'))}
        uiListOpen={uiListOpen}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  uiListOpen: React.PropTypes.bool.isRequired
})

ListBtnContainer.propTypes = {
  uiListOpen: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(ListBtnContainer)
