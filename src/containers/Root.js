import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './Landing'
import Main from './Main'
import { fetchCity } from '../actions'
import '../css/root.css'

const Root = ({ city, dispatch, main }) => {
  if (!city) fetchCity('pasadena', 'cities.json')(dispatch)
  return main ? <Main /> : <Landing />
}

Root.propTypes = {
  city: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  main: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  console.log(state)
  return {
    city: state.city,
    main: state.ui.main
  }
}

export default connect(mapStateToProps)(Root)