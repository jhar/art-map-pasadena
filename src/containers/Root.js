import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './Landing'
import Main from './Main'
import { requestCity } from '../actions'
import '../css/root.css'

const Root = ({
  dispatch,
  pids,
  requestingCity,
  showMain,
  successCities
}) => {
  if (!requestingCity && !successCity) {
    requestCity('cities.json')(dispatch)
  }

  return showMain ? <Main /> : <Landing />
}

Root.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  pids: React.PropTypes.array.isRequired,
  requestingCity: React.PropTypes.bool.isRequired,
  showMain: React.PropTypes.bool.isRequired,
  successCity: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  console.log(state)
  return {
    pids: state.pids,
    requestingCitys: state.requestingCity,
    showMain: state.showMain,
    successCity: state.successCities
  }
}

export default connect(
  mapStateToProps
)(Root)
