import React, { PropTypes, Component } from 'react'
import Login from '../components/Login'
import Header from '../components/Header'
import List from '../components/List'
import Map from '../components/Map'
import Info from '../components/Info'

export default class App extends Component {
	render() {
		return (
			<main className="app">
				<Login />
				<Header />
				<List />
				<Map />
				<Info />
			</main>
		)
	}
}

