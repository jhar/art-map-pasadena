import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fbLogin } from '../actions'
import '../css/landing.css'

const Landing = ({ dispatch, pids }) => {
	return (
		<div className="container-landing">
			<div className="container-landing-inner">
        <img
          alt="artenings"
          className="title-landing"
          src={'images/artenings.png'}
        />
				<div className="container-fb-login">
          <p>An interactive map that allows you to browse upcoming events within a curated selection of arts organizations in Pasadena, California. If you would like a similar map of your own community, or if you would simply like to get involved, then e-mail me at justinadenharrison@gmail.com and introduce yourself.</p>
          <p>Facebook authentication is necessary to access events.</p>
          <img
            className="icon-fb-login"
            onClick={() => fbLogin(dispatch, pids)}
            src={'images/login.png'}
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
