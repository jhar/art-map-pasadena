import React, { PropTypes, Component } from 'react'

export default class Login extends Component {
    login = () => {
        FB.login(response => {
            if (response.authResponse) {
                this.props.toggleLogin(false)
            } else if (!response || response.error) {
                window.console.log('fb_error')
            }
        })
    }
	render() {
		return (
			<section className="login-view">
				<div className="login-inner">
					<div className="fb-auth">
                        <img className="fb-auth-icon" onClick={this.login} src="images/login.png" />
                    </div>
					<span className="login-title">artenings</span>
				</div>
			</section>
		)
	}
}

