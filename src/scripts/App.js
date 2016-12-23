import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import Header from './components/Header'
import List from './components/List'
import Map from './components/Map'
import Info from './components/Info'
import '../styles/main.css'

// Application configuration
const DATA_URL = 'pasadena.json'

// Objects for specific state transformations
const DEFAULT_STATE = {
  active_location: null,
  info_clicked: false,
  list_clicked: false,
  locations: [],
  show_info: false,
  show_list: false,
  show_login: true
}

const RESET_UI = {
  active_location: null,
  info_clicked: false,
  list_clicked: false,
  show_info: false,
  show_list: false,
  show_login: false
}

// Strings for CSS classes
const LIST_VIEW_DEFAULT = 'list-view'
const LIST_VIEW_OPENED = 'list-view list-view-open'
const LIST_VIEW_CLOSED = 'list-view list-view-close'
const INFO_VIEW_DEFAULT = 'info-view'
const INFO_VIEW_OPENED = 'info-view info-animate-right'
const INFO_VIEW_CLOSED = 'info-view info-animate-left'

class App extends Component {
  state = DEFAULT_STATE

  // State that shouldn't trigger re-renders
  covers = []
  events = []

  getCover = (pid, locIndex, evtIndex) => {
    const query = `/${pid}?fields=cover{source, offset_y}`
    FB.api(query, (response) => {
      if (response && !response.error) {
        if (evtIndex === undefined) {
          this.covers[locIndex] = [response.cover]
        } else {
          this.covers[locIndex][evtIndex+1] = response.cover
        }
      } else {
        // TODO: Handle error
      }
    })
  }

  getEvents = (pid, timeStamp, callback, object) => {
    const query = `/${pid}/events?since=${timeStamp}`

    FB.api(query, (response) => {
      if (response && !response.error) {
        callback.call(object, response)
      }
    })
  }

  liveSearch = (event) => {
    const pattern = new RegExp(event.target.value.toLowerCase())
    const length = this.state.locations.length

    for (let i = 0; i < length; i++) {
      let name = this.state.locations[i].name
      let lower = name.toLowerCase()
      if (pattern.test(lower)) {
        let newLocations = this.state.locations
        newLocations[i].visibility = true
        this.setState({ locations: newLocations })
      } else {
        let newLocations = this.state.locations
        newLocations[i].visibility = false
        this.setState({ locations: newLocations})
      }
    }
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
    if (this.state.show_info) {
      this.setState({ active_location: null })
    }
  }

  resetUI = () => {
    this.setState(RESET_UI)
  }

  selectActive = value => {
    // Select a location and deselect the rest
    this.setState({
      active_location: (this.state.active_location === value) ? null : value
    })

    // Do nothing if the right location is already selected
    if (this.state.show_info === false || this.state.active_location === null) {
      this.nullifyActive()
      // Open info window of active location
      this.toggleInfo()
    }

    // Close the list view if it's open
    if (this.state.show_list === true) {
      this.toggleList()
    }
  }

  toggleInfo = () => {
    this.nullifyActive()
    this.setState({ show_info: !this.state.show_info, info_clicked: true })
  }

  toggleList = () => {
    this.setState({ show_list: !this.state.show_list, list_clicked: true })
  }

  toggleLogin = value => {
    if (value) {
      FB.logout()
    } else {
      this.loadAuthorizedData(Math.floor(Date.now()/1000))
    }

    this.resetUI()
    this.setState({ show_login: value })
  }

  componentWillMount() {
    this.loadData()
  }

  render() {
    let listClasses = LIST_VIEW_DEFAULT
    if (this.state.show_list && this.state.list_clicked) {
      listClasses = LIST_VIEW_OPENED
    } else if (this.state.list_clicked){
      listClasses = LIST_VIEW_CLOSED
    }

    let infoClasses = INFO_VIEW_DEFAULT
    if (this.state.show_info && this.state.info_clicked) {
      infoClasses = INFO_VIEW_OPENED
    } else if (this.state.info_clicked) {
      infoClasses = INFO_VIEW_CLOSED
    }

    let locationName = ''
    if (this.state.active_location !== null) {
      locationName = this.state.locations[this.state.active_location].name
    }

    if (this.state.show_login) {
      return ( <Login toggleLogin={this.toggleLogin} /> )
    } else {
      return (
        <div>
          <Header liveSearch={this.liveSearch}
                  showList={this.state.show_list}
                  toggleList={this.toggleList} />
          <List   listClasses={listClasses}
                  locations={this.state.locations}
                  selectActive={this.selectActive}
                  toggleLogin={this.toggleLogin}/>
          <Map    active={this.state.active_location}
                  selectActive={this.selectActive}
                  showInfo={this.state.show_info}
                  locations={this.state.locations}
                  toggleInfo={this.toggleInfo} />
          <Info   activeLocation={this.state.active_location}
                  locationName={locationName}
                  covers={this.covers}
                  events={this.events}
                  infoClasses={infoClasses}
                  toggleInfo={this.toggleInfo} />
        </div>
      )
    }
  }
}

ReactDOM.render (
  <App />,
  document.getElementsByClassName('app')[0]
)
