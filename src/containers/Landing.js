import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { errorAuth, requestingAuth, successAuth, toggleAuth } from '../actions'
import { CLOSE_AUTH, BASE_AUTH, OPEN_AUTH } from '../constants/animation'
import { ICON_LANDING, ICON_AUTH } from '../constants/images'
import { P_LANDING, P_AUTH } from '../constants/text'
import '../css/landing.css'

const Landing = ({
  animateAuth,
  requestingAuth,
  showAuth,
  toggleAuth
}) => {
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
          onClick={toggleAuth}
          src={ICON_LANDING}
        />
				<div className={animation}>
          <p>{P_LANDING}</p>
          <p>{P_AUTH}</p>
          <img
            className="icon-auth"
            onClick={requestingAuth}
            src={ICON_AUTH}
          />
        </div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
  animateAuth: state.animateAuth,
  showAuth: state.showAuth
})

const mapDispatchToProps = dispatch => ({
  requestingAuth: bindActionCreators(requestingAuth, dispatch),
  toggleAuth: bindActionCreators(toggleAuth, dispatch)
})

Landing.propTypes = {
  animateAuth: React.PropTypes.bool.isRequired,
  requestingAuth: React.PropTypes.func.isRequired,
  showAuth: React.PropTypes.bool.isRequired,
  toggleAuth: React.PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
