import { LOGGED_IN, AUTHORIZED, FB_ERROR } from '../constants/ActionTypes'

const initialState = [{
	loggedIn: false,
	authorized: false,
	fbErr: false,
	id: 0
}]

const facebook = (state = initialState, action) => {
	switch(action.type) {
		case LOGGED_IN:
			return Object.assign({}, state, {
				loggedIn: action.value
			})
		case AUTHORIZED:
			return Object.assign({}, state, {
				authorized: action.value
			})
		case FB_ERROR:
			return Object.assign({}, state, {
				authorized: action.value
			})
		default:
			return state
	}
}

export default facebook