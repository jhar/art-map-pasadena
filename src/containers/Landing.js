import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fbLogin } from '../actions'
import { ICON_LANDING, ICON_FB_LOGIN } from '../constants/images'
import { P_FB_LOGIN, P_LANDING } from '../constants/text'
import '../css/landing.css'

const Landing = ({ dispatch, pids }) => {
	return (
		<div className="container-landing">
			<div className="container-landing-inner">
        <img
          alt="artenings"
          className="title-landing"
          src={ICON_LANDING}
        />
				<div className="container-fb-login">
          <p>{P_LANDING}</p>
          <p>{P_FB_LOGIN}</p>
          <img
            className="icon-fb-login"
            onClick={() => fbLogin(dispatch, pids)}
            src={ICON_FB_LOGIN}
          />
        </div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
  pids: state.pids
})

Landing.propTypes = {
  pids: React.PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Landing)
