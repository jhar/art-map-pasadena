import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import Header from './components/Header'
import List from './components/List'
import Map from './components/Map'
import Info from './components/Info'

// TODO: Center icon when info view shown
// TODO: Login screen animate info & login
// TODO: Hide list view w/ active location

class App extends Component {
    state = {
        active_location: null,
        info_clicked: false,
        list_clicked: false,
        locations: [],
        show_info: false,
        show_list: false,
        show_login: true
    }

    // Data that shouldn't trigger re-renders
    covers = []
    events = []

    getCover = (pid, locIndex, evtIndex) => {
        let query = `/${pid}?fields=cover{source, offset_y}`
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
        let query = `/${pid}/events?since=${timeStamp}`
        FB.api(query, (response) => {
            if (response && !response.error) {
                callback.call(object, response)
            } else {
                // TODO: Handle error
            }
        })
    }

    liveSearch = (event) => {
        let pattern = new RegExp(event.target.value.toLowerCase())
        let length = this.state.locations.length
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

    selectActive = value => {
        // Turn off already active locations
        if (this.state.active_location === value) {
            this.setState({ active_location: null })
        } else {
            // Otherwise set the active location
            this.setState({ active_location: value })
        }

        // Toggle info window if closed
        if (this.state.show_info === false) {
            this.toggleInfo()
        } else if (this.state.active_location === null) {
            // Or if there's no active location
            this.toggleInfo()
        }

    }

    toggleInfo = () => {
        this.setState({ show_info: !this.state.show_info, info_clicked: true })
    }

    toggleList = () => {
        this.setState({ show_list: !this.state.show_list, list_clicked: true })
    }

    toggleLogin = value => {
        if (value === false) {
            let timeStamp = Math.floor(Date.now() /1000)
            this.loadAuthorizedData(timeStamp)
        }
        this.setState({ show_login: value })
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
        fetch('pasadena.json')
            .then(response => response.json())
            .then(json => {
                let len = json.locations.length
                let newLocations = []
                // Construct our locations array from JSON
                for (let i = 0; i < len; i++) {
                    newLocations.push({...json.locations[i], visible: false})
                }
                this.setState({ locations: newLocations })
            })
    }

    componentWillMount() {
        this.loadData()
    }

    render() {
        let listClasses = 'list-view'
        if (this.state.show_list && this.state.list_clicked) {
            listClasses = 'list-view list-view-open'
        } else if (this.state.list_clicked){
            listClasses = 'list-view list-view-close'
        }

        let infoClasses = 'info-view'
        if (this.state.show_info && this.state.info_clicked) {
            infoClasses = 'info-view info-animate-right'
        } else if (this.state.info_clicked) {
            infoClasses = 'info-view info-animate-left'
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
                            selectActive={this.selectActive} />
                    <Map    active={this.state.active_location} 
                            selectActive={this.selectActive} 
                            locations={this.state.locations}
                            toggleInfo={this.toggleInfo} />
                    <Info   activeLocation={this.state.active_location}
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
