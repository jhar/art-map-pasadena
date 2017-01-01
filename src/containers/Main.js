import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './Header'
import List from '../components/List'
import Map from '../components/Map'
import Info from '../components/Info'

const Main = ({
  active,
  animateInfo,
  animateList,
  select,
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
        select={select}
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

const mapDispatchToProps = dispatch => ({
  setActive: bindActionCreators(setActive, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
