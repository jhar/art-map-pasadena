import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { requestAuth, toggle } from '../actions'
import { CLOSE_AUTH, BASE_AUTH, OPEN_AUTH } from '../constants/animation'
import { ICON_LANDING, ICON_AUTH } from '../constants/images'
import { P_LANDING, P_AUTH } from '../constants/text'
import '../css/landing.css'

const Landing = ({ auth, dispatch, pids }) => {
  const animation = (
    auth.wasClicked ?
      (auth.shouldOpen ? OPEN_AUTH : CLOSE_AUTH) :
      BASE_AUTH
  )

	return (
		<div className="container-landing">
			<div className="container-landing-inner">
        <img
          alt="artenings"
          className="title-landing"
          onClick={() => dispatch(toggle('auth'))}
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
  auth: state.ui.auth,
  pids: state.pids
})

Landing.propTypes = {
  auth: React.PropTypes.object.isRequired,
  pids: React.PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Landing)
