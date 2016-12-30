import React, { Component } from 'react'
import '../../styles/login.css'

const CLOSE = 'fb-auth login-close'
const DEFAULT = 'fb-auth'
const URL = 'images/login.png'
const OPEN = 'fb-auth login-open'
const P_1 = 'An interactive map that allows you to browse upcoming events within a curated selection of arts organizations in Pasadena, California. If you would like a similar map of your own community, or if you would simply like to get involved, then e-mail me at justinadenharrison@gmail.com and introduce yourself.'
const P_2 = 'Facebook authentication is necessary to access events.'

const Login = ({clicked, data, login, show, toggle}) => {
  const css = clicked ? show ? OPEN : CLOSE : DEFAULT
  const loginBtn = <img className="fb-auth-icon" onClick={login} src={URL} />
	return (
		<section className="login-view">
			<div className="login-inner">
        <img
          alt="artenings"
          className="login-title"
          onClick={toggle}
          src="images/artenings.png"
        />
				<div className={css}>
          <p>{P_1}</p>
          <p>{P_2}</p>
          {data ? loginBtn : ''}
        </div>
			</div>
		</section>
	)
}

Login.propTypes = {
  clicked: React.PropTypes.bool.isRequired,
  data: React.PropTypes.bool.isRequired,
  login: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired
}

export default Login
