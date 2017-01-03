import {
  NULL_ACTIVE,
  RESET_UI,
  REQUEST,
  SET_ACTIVE,
  SET_CITY,
  SET_GRAPH,
  SET_VISIBLE,
  TOGGLE_AUTH,
  TOGGLE_INFO,
  TOGGLE_LIST,
  TOGGLE_SEARCH
} from './constants/actionTypes.js'

const request = (name, status) => ({ name, status, type: REQUEST })

const setCity = (city, json) => ({
  city: city,
  pids: json[city],
  type: SET_CITY
})

export const requestCity = (city, url) => dispatch => {
  dispatch(request(city, 'open'))
  fetch(url)
    .then(response => {
      if (response.ok) {
        dispatch(request(city, 'ok'))
        return response.json()
      } else {
        dispatch(request(city, 'error'))
      }
    })
    .catch(error => console.log('Fetch Error: ' + error))
    .then(json => {
      dispatch(setCity(city, json))
    })
}

export const requestAuth = (dispatch, pids) => {
  dispatch(request('auth', 'open'))
  FB.login(response => {
    if (response.authResponse) {
      dispatch(request('auth', 'ok'))
      pids.map((pid) => {
        requestGraph(dispatch, pid)
      })
    } else if (!response || response.error) {
      dispatch(request('auth', 'error'))
    }
  })
}

const requestGraph = (dispatch, pid) => {
  const time = Math.floor(Date.now()/1000)
  const location = 'name,location{latitude, longitude}'
  const cover = 'cover{source, offset_y}'
  const events = `events.since(${time}){description, name, ${cover}}`
  dispatch(request(pid, 'open'))
  FB.api(
    `/${pid}?fields=${location},${cover},${events}`,
    (response) => {
      if(response && !response.error) {
        dispatch(request(pid, 'ok'))
        dispatch(setGraph(pid, response))
      } else {
        dispatch(request(pid, 'error'))
      }
    }
  )
}

const setGraph = (pid, response) => ({
  graph: response,
  pid: pid,
  type: SET_GRAPH
})






export const nullActive = () => ({type: NULL_ACTIVE })
export const resetUI = () => ({ type: RESET_UI })
export const setActive = () => ({ type: SET_ACTIVE })
export const setVisible = () => ({ type: SET_VISIBLE })

export const toggleAuth = () => ({ type: TOGGLE_AUTH })
export const toggleInfo = () => ({ type: TOGGLE_INFO })
export const toggleList = () => ({ type: TOGGLE_LIST })
export const toggleSearch = () => ({ type: TOGGLE_SEARCH })
