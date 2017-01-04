import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import List from '../components/List'
import Map from '../components/Map'
import Info from '../components/Info'

const Main = ({ active, setActive, ui }) => {
  return (
    <div>
      <Header />
      <Info uiInfo={ui.info} />
      <List setActive={setActive} uiList={ui.list} />
      <Map active={active} setActive={setActive}
        showInfo={showInfo}
      />
    </div>
  )
}

Main.propTypes = {
  active: React.PropTypes.number.isRequired,
  setActive: React.PropTypes.func.isRequired,
  info: React.PropTypes.object.isRequired,
  list: React.PropTypes.object.isRequired,
  search: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  active: state.active,
  info: state.ui.info,
  list: state.ui.list,
  search: state.showSearch
})

export default connect(mapStateToProps)(Main)
