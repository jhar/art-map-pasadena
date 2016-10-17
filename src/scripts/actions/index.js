export const selectLocation = location => ({
	type: SELECT_LOCATION,
	location
})

export const requestLocations = city => dispatch => {
	dispatch(requestLocations(city))
	return fetch(`${pasadena}.json`)
		.then(response => response.json())
		.then(json => dispatch(receiveLocations(city, json)))
}

export const receiveLocations = (city, json) => ({
	type: RECEIVE_LOCATIONS,
	city,
	locations: json.data.children.map(child => child.data),
	receivedAt: Date.now()
})

