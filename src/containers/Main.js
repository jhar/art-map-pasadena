import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import List from '../components/List'
import Map from '../components/Map'
import Info from '../components/Info'

const Main = ({
  active,
  animateInfo,
  animateList,
  setActive,
  showInfo,
  showList,
  showSearch
}) => {
  return (
    <div>
      <Header />
      <Info
        animateInfo={animateInfo}
        showInfo={showInfo}
      />
      <List
        animateList={animateList}
        setActive={setActive}
        showList={showList}
      />
      <Map
        active={active}
        setActive={setActive}
        showInfo={showInfo}
      />
    </div>
  )
}

Main.propTypes = {
  active: React.PropTypes.number.isRequired,
  animateInfo: React.PropTypes.bool.isRequired,
  animateList: React.PropTypes.bool.isRequired,
  setActive: React.PropTypes.bool.isRequired,
  showInfo: React.PropTypes.bool.isRequired,
  showList: React.PropTypes.bool.isRequired,
  showSearch: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  active: state.active,
  animateInfo: state.animateInfo,
  animateList: state.animateList,
  showInfo: state.showInfo,
  showInfo: state.showInfo,
  showSearch: state.showSearch
})

export default connect(mapStateToProps)(Main)
