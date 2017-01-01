import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './Header'
import List from '../components/List'
import Map from '../components/Map'
import Info from '../components/Info'

const Main = ({
  activePlace,
  animateInfo,
  animateList,
  selectActive,
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
        selectActive={selectActive}
        showList={showList}
      />
      <Map
        activePlace={activePlace}
        selectActive={selectActive}
        showInfo={showInfo}
      />
    </div>
  )
}

Main.propTypes = {
  activePlace: React.PropTypes.number.isRequired,
  animateInfo: React.PropTypes.bool.isRequired,
  animateList: React.PropTypes.bool.isRequired,
  selectActive: React.PropTypes.bool.isRequired,
  showInfo: React.PropTypes.bool.isRequired,
  showList: React.PropTypes.bool.isRequired,
  showSearch: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  activePlace: state.activePlace,
  animateInfo: state.animateInfo,
  animateList: state.animateList,
  showInfo: state.showInfo,
  showInfo: state.showInfo,
  showSearch: state.showSearch
})

const mapDispatchToProps = dispatch => ({
  selectActive: bindActionCreators(selectActive, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
