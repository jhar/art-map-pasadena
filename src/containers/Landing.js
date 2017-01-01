import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { requestAuth, toggleAuth } from '../actions'
import { CLOSE_AUTH, BASE_AUTH, OPEN_AUTH } from '../constants/animation'
import { ICON_LANDING, ICON_AUTH } from '../constants/images'
import { P_LANDING, P_AUTH } from '../constants/text'
import '../css/landing.css'

const Landing = ({ animateAuth, dispatch, pids, showAuth }) => {
  const animation = (
    animateAuth ?
      (showAuth ? OPEN_AUTH : CLOSE_AUTH) :
      BASE_AUTH
  )

	return (
		<div className="container-landing">
			<div className="container-landing-inner">
        <img
          alt="artenings"
          className="title-landing"
          onClick={() => dispatch(toggleAuth())}
          src={ICON_LANDING}
        />
				<div className={animation}>
          <p>{P_LANDING}</p>
          <p>{P_AUTH}</p>
          <img
            className="icon-auth"
            onClick={() => requestAuth(dispatch, pids)}
            src={ICON_AUTH}
          />
        </div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
  animateAuth: state.animateAuth,
  pids: state.pids,
  showAuth: state.showAuth
})

Landing.propTypes = {
  animateAuth: React.PropTypes.bool.isRequired,
  pids: React.PropTypes.array.isRequired,
  showAuth: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Landing)
