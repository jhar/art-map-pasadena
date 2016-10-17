import { combineReducers } from 'redux'
import { SELECT_LOCATION, RECEIVE_LOCATIONS } from '../actions'
import facebook from './facebook'

const selectedLocation = (state = '', action) => {
	switch (action.type) {
		case SELECT_LOCATION:
			return action.location
		default:
			return state
	}
}

const graphData = (state = {
	locations: [],
	markers: [],
	events: [],
	covers: [],
	active: {},
	fbErr: false,
	gmErr: false
}, action) => {
	switch (action.type) {
		case RECEIVE_LOCATIONS:
			return Object.assign({}, state, {
				lastUpdate: action.receivedAt
			})
		default:
			return state
	}
}

const reducerIndex = combineReducers({
	facebook,
	graphData
})

export default reducerIndex