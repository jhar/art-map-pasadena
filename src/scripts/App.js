import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import Header from './components/Header'
import List from './components/List'
import Map from './components/map'
import Info from './components/Info'
import '../styles/main.css'


const DATA_URL = 'pasadena.json'
const LST_DEFAULT = 'list-view'
const LST_OPEN = 'list-view list-view-open'
const LST_CLOSE = 'list-view list-view-close'
const INF_DEFAULT = 'info-view'
const INF_OPEN = 'info-view info-animate-right'
const INF_CLOSE = 'info-view info-animate-left'
const STATE_DEFAULT = {
  active: null,
  infClk: false,
  lstClk: false,
  locations: [],
  infShow: false,
  lstShow: false,
  lgnShow: true
}
const RESET_UI = {
  active: null,
  infClk: false,
  lstClk: false,
  infShow: false,
  lstShow: false,
  lgnShow: false
}

class App extends Component {
  state = STATE_DEFAULT

  // Mutable state that shouldn't trigger re-renders
  covers = []
  events = []

  getCover = (pid, locIndex, evtIndex) => {
    FB.api(`/${pid}?fields=cover{source, offset_y}`, (res) => {
      if (res && !res.error) {
        if (evtIndex === undefined) {
          this.covers[locIndex] = [res.cover]
        } else {
          this.covers[locIndex][evtIndex+1] = res.cover
        }
      }
    })
  }

  getEvents = (pid, time, cb, obj) => {
    FB.api(`/${pid}/events?since=${time}`, (res) => {
      if (res && !res.error) {
        cb.call(obj, res)
      }
    })
  }

  loadAuthorizedData = (timeStamp) => {
    let length = this.state.locations.length
    for (let i = 0; i < length; i++) {
      this.getCover(this.state.locations[i].pid, i)
      this.getEvents(this.state.locations[i].pid, timeStamp, (response) => {
        this.events[i] = response.data
        let length2 = this.events[i].length
        for (let j = 0; j < length2; j++) {
          this.getCover(this.events[i][j].id, i, j)
        }
      })
    }
  }

  loadData = () => {
    fetch(DATA_URL)
      .then(response => response.json())
      .then(json => {
        let len = json.locations.length
        let newLocations = []
        // Construct our locations array from JSON
        for (let i = 0; i < len; i++) {
          newLocations.push({ ...json.locations[i], visible: false })
        }
        this.setState({ locations: newLocations })
      })
  }

  nullifyActive = () => {
    if (this.state.infShow) {
      this.setState({ active: null })
    }
  }

  resetUI = () => {
    this.setState(RESET_UI)
  }

  selectActive = value => {
    // Select a location and deselect the rest
    this.setState({
      active: (this.state.active === value) ? null : value
    })

    // Don't open a window that's already open
    if (this.state.infShow === false || this.state.active === null) {
      this.nullifyActive()
      this.infToggle()
    }

    // Close the lst view if it's open
    if (this.state.lstShow === true) {
      this.lstToggle()
    }
  }

  search = event => {
    const pattern = new RegExp(event.target.value.toLowerCase())

    // const matches = this.state.locations.map(function(location) {
    //     pattern.test(location.name.toLowerCase())
    // })

    let newLocations = this.state.locations

    for (let i = 0; i < length; i++) {
      let name = this.state.locations[i].name
      if (pattern.test(name.toLowerCase())) {
        newLocations[i].visibility = true
      } else {
        newLocations[i].visibility = false
      }
    }

    this.setState({ locations: newLocations })
  }

  infToggle = () => {
    this.nullifyActive()
    this.setState({ infShow: !this.state.infShow, infClk: true })
  }

  lstToggle = () => {
    this.setState({ lstShow: !this.state.lstShow, lstClk: true })
  }

  lgnToggle = value => {
    if (value) {
      FB.logout()
    } else {
      this.loadAuthorizedData(Math.floor(Date.now()/1000))
    }

    this.resetUI()
    this.setState({ lgnShow: value })
  }

  componentWillMount() {
    this.loadData()
  }

  render() {
    const p = this.props
    const s = this.state
    const lstCss = s.lstClk ? s.lstShow ? LST_OPEN : LST_CLOSE : LST_DEFAULT
    const infCss = s.infClk ? s.infShow ? INF_OPEN : INF_CLOSE : INF_DEFAULT
    const locName = s.active === null ? '' : s.locations[s.active].name

    if (s.lgnShow) {
      return ( <Login lgnToggle = { this.lgnToggle } /> )
    } else {
      return (
        <div>
          <Header
            search={this.search}
            lstShow={s.lstShow}
            lstToggle={this.lstToggle}
          />
          <List
            lstCss={lstCss}
            locations={this.state.locations}
            selectActive={this.selectActive}
            lgnToggle={this.lgnToggle}
          />
          <Map
            active={s.active}
            selectActive = { this.selectActive }
            infShow = { s.infShow }
            locations = { s.locations }
            infToggle = { this.infToggle }
          />
          <Info
            active={s.active}
            locName={locName}
            covers={this.covers}
            events={this.events}
            infCss={infCss}
            infToggle={this.infToggle}
          />
        </div>
      )
    }
  }
}

ReactDOM.render (
  <App />,
  document.getElementsByClassName('app')[0]
)
