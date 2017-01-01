import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Landing from './Landing'
import Main from './Main'
import {
  errorCities,
  requestingCities,
  successCities,
  setPids
} from '../actions'
import '../css/root.css'

const Root = ({
  errorCities,
  pids,
  requestingCities,
  showMain,
  successCities
}) => {
  const handleCity = city => console.log(city)
  const loadCities = (city, error, ok) => {
    fetch('cities.json')
      .then(res => {
        ok()
        return res.json()
      })
      .catch(reason => {
        error()
        return reason
      })
  }

  if (!pids) {
    // requestCities()
    //handleCity(loadCities(errorCities, successCities))
  }

  return showMain ? <Main /> : <Landing />
}

const mapStateToProps = state => {
  console.log(state)
  return {
    pids: state.pids,
    showMain: state.showMain
  }
}

const mapDispatchToProps = dispatch => ({
  errorCities: bindActionCreators(errorCities, dispatch),
  requestingCities: bindActionCreators(requestingCities, dispatch),
  successCities: bindActionCreators(successCities, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
