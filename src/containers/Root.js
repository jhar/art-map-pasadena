import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './Landing'
import Main from './Main'
import { requestCity } from '../actions'
import '../css/root.css'

const Root = ({ cityOk, cityReq, dispatch, showMain }) => {
  if (!cityReq && !cityOk) {
    requestCity('pasadena', 'cities.json')(dispatch)
  }

  return showMain ? <Main /> : <Landing />
}

Root.propTypes = {
  cityOk: React.PropTypes.bool.isRequired,
  cityReq: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  showMain: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  console.log(state)
  return {
    cityOk: state.cityOk,
    cityReq: state.cityReq,
    showMain: state.showMain
  }
}

export default connect(mapStateToProps)(Root)
