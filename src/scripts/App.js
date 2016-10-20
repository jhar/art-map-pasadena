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
        locations: [],
        show_info: false,
        show_list: false,
        show_login: true
    }
    selectActive = value => {
        // Turn off already active locations
        if (this.state.active_location === value) {
            this.setState({ active_location: null })
        } else {
            // Otherwise set the active location
            this.setState({ active_location: value })
        }
    }
    toggleLogin = value => {
        this.setState({ show_login: value })
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
        // Only show the login screen if user is not authorized
        if (this.state.show_login) {
            return ( <Login toggleLogin={this.toggleLogin} /> )
        } else {
            return ( 
                <div>
                    <Header />
                    <List />
                    <Map active={this.state.active_location} selectActive={this.selectActive} locations={this.state.locations} />
                    <Info />
                </div>
            )
        }
    }
}

ReactDOM.render (
    <App />,
    document.getElementsByClassName('app')[0]
)
