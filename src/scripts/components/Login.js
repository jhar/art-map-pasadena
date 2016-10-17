import React, { PropTypes, Component } from 'react'

export default class Login extends Component {
	componentDidMount() {
		let button = '<fb:login-button scope="public_profile,email"' +
					 ' onlogin="checkIfLoggedIn()"></fb:login-button>'
		let container = document.getElementsByClassName('fb-auth')[0]
		container.innerHTML = button
	}
	render() {
		return (
			<section className="login-view">
				<div className="login-inner">
					<div className="fb-auth"></div>
					<span className="login-title">artenings</span>
				</div>
			</section>
		)
	}
}

