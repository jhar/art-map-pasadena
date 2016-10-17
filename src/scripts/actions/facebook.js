import { LOGGED_IN, AUTHORIZED, FB_ERROR } from '../constants/ActionTypes'

export const loggedIn = value => ({
	type: 'LOGGED_IN',
	value
})

export const authorized = value => ({
	type: 'AUTHORIZED',
	value
})

export const fbError = value => ({
	type: 'FB_ERROR',
	value
})

const checkIfLoggedIn = () => {
	document.FB.getLoginStatus = response => {
		if (response.status === 'connected') {
			dispatch(loggedIn(true))
			dispatch(authorized(true))
		} else if (response.status === 'not_authorized') {
			dispatch(loggedIn(true))
			dispatch(authorized(false))
		} else if (!response || response.error) {
			dispatch(fbErr(true))
		} else {
			dispatch(loggedIn(false))
		}
	}
}