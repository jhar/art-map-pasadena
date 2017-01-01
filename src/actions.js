import {
  AUTH_ERR,
  AUTH_OK,
  AUTH_REQ,
  CITY_ERR,
  CITY_OK,
  CITY_REQ,
  GRAPH_ERR,
  GRAPH_OK,
  GRAPH_REQ,
  NULL_ACTIVE,
  RESET_UI,
  SET_ACTIVE,
  SET_CITY,
  SET_PLACE,
  SET_VISIBLE,
  TOGGLE_AUTH,
  TOGGLE_INFO,
  TOGGLE_LIST,
  TOGGLE_SEARCH
} from './actionTypes.js'

const cityErr = () => ({ type: CITY_ERR })
const cityOk = () => ({type: CITY_OK })
const cityReq = () => ({ type: CITY_REQ })

const setCity = (city, json) => ({
  city: city,
  pids: json[city],
  type: SET_CITY,
})

export const requestCity = (city, url) => dispatch => {
  dispatch(cityReq())
  fetch(url)
    .then(response => {
      if (response.ok) {
        dispatch(cityOk())
        return response.json()
      } else {
        dispatch(cityErr())
      }
    })
    .catch(error => console.log('Fetch Error: ' + error))
    .then(json => {
      dispatch(setCity(city, json))
    })
}

const authReq = () => ({ type: AUTH_REQ })
const authOk = () => ({ type: AUTH_OK })
const authErr = () => ({ type: AUTH_ERR })

export const requestAuth = (dispatch, pids) => {
  dispatch(authReq())
  FB.login(response => {
    if (response.authResponse) {
      dispatch(authOk())
      pids.map((pid) => {
        requestGraph(dispatch, pid)
      })
    } else if (!response || response.error) {
      dispatch(authErr())
    }
  })
}

const graphReq = (pid) => ({ pid: pid, type: GRAPH_REQ })
const graphOk = (pid) => ({ pid: pid, type: GRAPH_OK })
const graphErr = (pid) => ({ pid: pid, type: GRAPH_ERR })

const requestGraph = (dispatch, pid) => {
  const time = Math.floor(Date.now()/1000)
  const location = 'name,location{latitude, longitude}'
  const cover = 'cover{source, offset_y}'
  const events = `events.since(${time}){description, name, ${cover}}`
  dispatch(graphReq(pid))
  FB.api(
    `/${pid}?fields=${location},${cover},${events}`,
    (response) => {
      if(response && !response.error) {
        dispatch(graphOk(pid))
        dispatch(setPlace(pid, response))
      } else {
        dispatch(graphErr(pid))
      }
    }
  )
}

const setPlace = (pid, response) => ({
  coverSrc: response.cover.source,
  coverOffY: response.cover.offset_y,
  latitude: response.location.latitude,
  longitude: response.location.longitude,
  name: response.name,
  pid: pid,
  type: SET_PLACE
})






export const nullActive = () => ({type: NULL_ACTIVE })
export const resetUI = () => ({ type: RESET_UI })
export const setActive = () => ({ type: SET_ACTIVE })
export const setVisible = () => ({ type: SET_VISIBLE })

export const toggleAuth = () => ({ type: TOGGLE_AUTH })
export const toggleInfo = () => ({ type: TOGGLE_INFO })
export const toggleList = () => ({ type: TOGGLE_LIST })
export const toggleSearch = () => ({ type: TOGGLE_SEARCH })
