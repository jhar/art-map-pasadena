import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './Landing'
import Main from './Main'
import { fetchCity } from '../actions'
import '../css/root.css'

const App = ({ city, dispatch, main }) => {
  if (!city) fetchCity('pasadena', 'cities.json')(dispatch)
  return main ? <Main /> : <Landing />
}

const mapStateToProps = state => {
  console.log(state)
  return {
    city: state.city,
    main: state.ui.main
  }
}

App.propTypes = {
  city: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  main: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(App)
