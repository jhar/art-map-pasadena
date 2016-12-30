import mori from 'mori'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { reducer } from './reducer.js'
import Login from './components/Login'
import Header from './components/Header'
import List from './components/List'
import Map from './components/map'
import Info from './components/Info'
import { getGraphData, handleLogin, handleLogout } from './facebook'
import '../styles/main.css'

const store = createStore(reducer)

function getActive(places, active) {
  return mori.toJs(mori.getIn(places, [active]))
}

function search(places) {
  return function(e) {
    const pattern = new RegExp(e.target.value.toLowerCase())
    let places = places
    for (let i = 0; i < length; i++) {
      let name = places[i].name
      if (pattern.test(name.toLowerCase())) {
        newPlaces[i].visible = true
      } else {
        newPlaces[i].visible = false
      }
    }
    places = newPlaces
  }
}

const App = ({ store }) => {
  if (!jsonIsReady) {
    loadCity('pasadena', places, () => {
      ui.data = true
    })
  }

  if (ui.app) {
    return (
      <div>
        <Header
          search={search}
          searchToggle={searchToggle}
          searchUI={ui.search}
          show={ui.list.show}
          toggle={listToggle}
        />
        <List
          clicked={ui.list.clicked}
          logout={handleLogout}
          places={places}
          select={selectActive}
          show={ui.list.show}
        />
        <Map
          active={ui.active}
          places={places}
          select={selectActive}
          show={ui.info.show}
          toggle={infoToggle}
        />
        <Info
          clicked={ui.info.clicked}
          place={getActive(places, ui.active)}
          show={ui.info.show}
          toggle={infoToggle}
        />
      </div>
    )
  } else {
    return (
      <Login
        clicked={ui.login.clicked}
        data={ui.data}
        login={handleLogin}
        show={ui.login.show}
        toggle={loginToggle}
      />
    )
  }
}

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementsByClassName('app')[0]
  )
}

store.subscribe(render)
render()
