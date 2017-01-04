import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import List from '../components/List'
import Map from '../components/Map'
import Info from '../components/Info'

const Main = ({ active, ui }) => {
  return (
    <div>
      <Header />
      <Info uiInfo={ui.info} />
      <List setActive={setActive} uiList={ui.list} />
      <Map active={active} setActive={setActive} uiInfoOpen={ui.info.open} />
    </div>
  )
}

Main.propTypes = {
  active: React.PropTypes.number.isRequired,
  ui: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  active: state.active,
  ui: state.ui
})

export default connect(mapStateToProps)(Main)
