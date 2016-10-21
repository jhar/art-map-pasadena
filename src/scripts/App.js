import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import Header from './components/Header'
import List from './components/List'
import Map from './components/Map'
import Info from './components/Info'

class App extends Component {
    state = {
        active_location: null,
        covers: [],
        events: [],
        locations: [],
        info_clicked: false,
        list_clicked: false,
        show_info: false,
        show_list: false,
        show_login: true
    } 
    getCoverPhoto = (pid, locIndex, evtIndex) => {
        let query = '/${pid}?fields=cover{source, offset_y}'
        FB.api(query, (response) => {
            if (response && !response.error) {
                if (event === undefined) {
                    covers[locIndex] = [response.cover]
                } else {
                    covers[locIndex][evtIndex] = response.cover
                }
            } else {
                // TODO: Handle error
            }
        })
    }
    getEvents = (pid, timeStamp, callback, object) => {
        let query = '/${pid}/events?since=${timeStamp}'
        Fb.api(query, (response) => {
            if (response && !response.error) {
                callback.call(object, response)
            } else {
                // TODO: Handle error
            }
        })
    }
    liveSearch = (model, obj) => {
        let pattern = new RegExp(obj.currentTarget.value.toLowerCase())
        let length = this.state.locations.length
        for (let i = 0; i < length; i++) {
            let name = this.state.locations[i].name
            let lower = name.toLowerCase()
            if (pattern.test(lower)) {
                // set visibility to true
            } else {
                // set visibility to false
            }
        }
    }
    selectActive = value => {
        this.toggleInfo()
        // Turn off already active locations
        if (this.state.active_location === value) {
            this.setState({ active_location: null })
        } else {
            // Otherwise set the active location
            this.setState({ active_location: value })
        }
    }
    toggleInfo = () => {
        this.setState({ show_info: !this.state.show_info, info_clicked: true })
    }
    toggleList = () => {
        this.setState({ show_list: !this.state.show_list, list_clicked: true })
    }
    toggleLogin = value => {
        this.setState({ show_login: value })
        if (value === false) {

        }
    }
    loadData = () => {
        this.setState({ locations: [] })
        let newLocations = []
        fetch('pasadena.json')
            .then(response => response.json())
            .then(json => {
                let newLocations = []
                let len = json.locations.length
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
        console.log(this.state)

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
                    <Header showList={this.state.show_list}
                            toggleList={this.toggleList} />
                    <List   listClasses={listClasses} 
                            locations={this.state.locations}
                            selectActive={this.selectActive} />
                    <Map    active={this.state.active_location} 
                            selectActive={this.selectActive} 
                            locations={this.state.locations}
                            toggleInfo={this.toggleInfo} />
                    <Info   infoClasses={infoClasses}
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
