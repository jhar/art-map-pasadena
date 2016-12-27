import React, { Component } from 'react'
import '../../styles/login.css'

const P_1 = 'An interactive map that allows you to browse upcoming events within a curated selection of arts organizations in Pasadena, California. If you would like a similar map of your own community, or if you would simply like to get involved, then e-mail me at justinadenharrison@gmail.com and introduce yourself.'
const P_2 = 'Facebook authentication is necessary to access events.'
const FB_CSS = 'fb-auth-icon'
const FB_URL = 'images/login.png'
const OPEN = 'fb-auth login-open'
const CLOSE = 'fb-auth login-close'
const DEFAULT = 'fb-auth'

export default class Login extends Component {
  state = { artClk: false, fbShow: false }

  login = () => {
    FB.login(res => {
      if (res.authResponse) {
        this.props.lgnToggle(false)
      } else if (!res || res.error) {
        window.console.log('fb_error')
      }
    })
  }

  fbToggle = () => {
    this.setState({ artClk: true, fbShow: !this.state.fbShow })
  }

	render() {
    const t = this
    const lgnCss = t.state.artClk ? t.state.fbShow ? OPEN : CLOSE : DEFAULT

		return (
			<section className="login-view">
				<div className="login-inner">
          <img
            alt="artenings"
            className="login-title"
            onClick={t.fbToggle}
            src="images/artenings.png"
          />
					<div className={lgnCss}>
            <p>{P_1}</p>
            <p>{P_2}</p>
            <img
              className={FB_CSS}
              onClick={t.login}
              src={FB_URL}
            />
          </div>
				</div>
			</section>
		)
	}
}
