import {
  ADD_CITY_DATA,
  ADD_FB_DATA,
  ANIMATE,
  NULL_ACTIVE,
  RESET_UI,
  REQUESTS,
  SEARCH,
  SET_ACTIVE,
  SET_VISIBLE,
  SHOW_MAIN
} from './constants/actionTypes.js'

const addCityData = (city, json) => ({
  city: city,
  pids: json[city],
  type: ADD_CITY_DATA
})

const addFbData = (pid, response) => ({
  graph: response,
  pid: pid,
  type: ADD_FB_DATA
})

export const animate = target => ({
  target,
  type: ANIMATE
})

export const nullActive = () => ({
  type: NULL_ACTIVE
})

export const resetUI = () => ({
  type: RESET_UI
})

const requests = (name, status) => ({
  name,
  status,
  type: REQUESTS
})

export const setActive = () => ({
  type: SET_ACTIVE
})

export const setVisible = () => ({
  type: SET_VISIBLE
})

export const showMain = () => ({
  type: SHOW_MAIN
})

const fbApi = (dispatch, pid) => {
  const time = Math.floor(Date.now()/1000)
  const location = 'name,location{latitude, longitude}'
  const cover = 'cover{source, offset_y}'
  const events = `events.since(${time}){description, name, ${cover}}`
  dispatch(requests(pid, 'open'))
  FB.api(
    `/${pid}?fields=${location},${cover},${events}`,
    (response) => {
      if(response && !response.error) {
        dispatch(requests(pid, 'ok'))
        dispatch(addFbData(pid, response))
      } else {
        dispatch(requests(pid, 'error'))
      }
    }
  )
}

export const fbLogin= (dispatch, pids) => {
  dispatch(requests('fbLogin', 'open'))
  FB.login(response => {
    if (response.authResponse) {
      dispatch(requests('fbLogin', 'ok'))
      pids.map((pid) => {
        fbApi(dispatch, pid)
      })
    } else if (!response || response.error) {
      dispatch(requests('fbLogin', 'error'))
    }
  })
}

export const fetchCity = (city, url) => dispatch => {
  dispatch(requests(city, 'open'))
  fetch(url)
    .then(response => {
      if (response.ok) {
        dispatch(requests(city, 'ok'))
        return response.json()
      } else {
        dispatch(requests(city, 'error'))
      }
    })
    .catch(error => console.log('Fetch Error: ' + error))
    .then(json => {
      dispatch(addCityData(city, json))
      dispatch(showMain())
    })
}
