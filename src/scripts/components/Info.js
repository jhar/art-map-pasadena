import React, { Component } from 'react'
import Event from './event'
import '../../styles/info.css'

const UPCOMING = 'Upcoming Events'
const NOTHING = 'No upcoming events'

function getProp(t, i, n) {
  return (
    t.props.active !== null ?
      t.props.covers[t.props.active][i][n] :
      t.state.last !== null ?
        t.props.covers[t.state.last][i][n] :
        ''
  )
}

function getTop(e, oy, isEvent) {
  const [fw, fh] = isEvent ? [826, 294] : [820, 312]
  const nw = e.target.naturalWidth
  const nh = e.target.naturalHeight
  const ow = e.target.offsetWidth
  return (oy * ow / 100) * ((nh / nw) - (fh / fw)) * -1
}

export default class Info extends Component {
  state = { last: null }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === null && this.props.active !== null) {
      this.setState({ last: this.props.active })
    }
  }

  render() {
    const t = this
    const p = t.props
    const s = t.state
    const oy = getProp(t, 0, 'offset_y') || ''
    const evtArr = (
      p.active !== null ?
        p.events[p.active] :
        s.last !== null ? p.events[s.last] : null
    )

    const evtItems = evtArr === null ? '' : evtArr.map((event, i) => {
      return (
        <Event
          getTop={getTop}
          src={getProp(t, i + 1, 'source')}
          offset={getProp(t, i + 1, 'offset_y')}
          event={event}
          key={i}
        />
      )
    })

    return(
			<section className={p.infCss}>
				<div className="arrow-wrap">
					<img
            className="arrow"
            onClick={p.infToggle}
            src="images/arrow-left.png"
          />
				</div>
				<div className="cover-outer-container">
					<div className="cover-inner-container">
						<img
              className="cover-photo"
              onLoad={(e) => e.target.style.top = getTop(e, oy, false) + 'px'}
              src={getProp(t, 0, 'source')}
              alt=""
            />
						<div className="cover-scrim"></div>
						<h1 className="title">
              {p.locationName}
            </h1>
					</div>
				</div>
				<h3 className="upcoming-events">
          {(evtArr && evtArr.length > 0) ? UPCOMING : NOTHING}
        </h3>
				<div className="events-container">
				 {evtItems}
        </div>
			</section>
		)
	}
}
