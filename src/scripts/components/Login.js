import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        icon_clicked: false,
        show_auth: false
    }

    login = () => {
        FB.login(response => {
            if (response.authResponse) {
                this.props.toggleLogin(false)
            } else if (!response || response.error) {
                window.console.log('fb_error')
            }
        })
    }

    toggleAuth = () => {
        this.setState({ icon_clicked: true, show_auth: !this.state.show_auth })
    }

	render() {
        let authClasses = 'fb-auth'
        if (this.state.show_auth && this.state.icon_clicked) {
            authClasses = 'fb-auth login-open'
        } else if (this.state.icon_clicked){
            authClasses = 'fb-auth login-close'
        }

		return (
			<section className="login-view">
				<div className="login-inner">
                    <img alt="artenings" className="login-title" onClick={this.toggleAuth} src="images/artenings.png" />
					<div className={authClasses}>
                        <p>An interactive map that allows you to browse upcoming events within a curated selection of arts organizations in Pasadena, California. If you would like a similar map of your own community, or if you would simply like to get involved, then e-mail me at justinadenharrison@gmail.com and introduce yourself.</p>
                        <p>Facebook authentication is necessary to access events.</p>
                        <img className="fb-auth-icon" onClick={this.login} src="images/login.png" />
                    </div>
				</div>
			</section>
		)
	}
}

