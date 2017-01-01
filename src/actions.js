import {
  ERROR_AUTH,
  ERROR_CITY,
  ERROR_GRAPH,
  NULL_ACTIVE,
  REQUESTING_AUTH,
  REQUESTING_CITY,
  REQUESTING_GRAPH,
  RESET_UI,
  SET_ACTIVE,
  SET_CITY_AND_PIDS,
  SET_VISIBLE,
  SUCCESS_AUTH,
  SUCCESS_CITIES,
  SUCCESS_GRAPH,
  TOGGLE_AUTH,
  TOGGLE_INFO,
  TOGGLE_LIST,
  TOGGLE_SEARCH
} from './actionTypes.js'

const requestingCity = () => ({ type: REQUESTING_CITY })
const successCity = () => ({type: SUCCESS_CITY })
const errorCity = () => ({ type: ERROR_CITY })

const setCityAndPids = (city, json) => ({
    type: SET_CITY_AND_PIDS,
    city: city,
    pids: json[city]
})

export const requestCity = (city, url) => dispatch => {
  dispatch(requestingCity())
  fetch(url)
    .then(response => {
      if (response.ok) {
        dispatch(successCity())
        return response.json()
      } else {
        dispatch(errorCity())
      }
    })
    .catch(error => console.log('Fetch Error: ' + error))
    .then(json => {
      dispatch(setCityAndPids(city, json))
    })
}



export const requestingAuth = () => ({ type: REQUESTING_AUTH })
export const successAuth = () => ({ type: SUCCESS_AUTH })
export const errorAuth = () => ({ type: ERROR_AUTH })

export const requestingGraph = () => ({ type: REQUESTING_GRAPH })
export const successGraph = () => ({ type: SUCCESS_GRAPH })
export const errorGraph = () => ({ type: ERROR_GRAPH })

export const addVisible = () => ({ type: ADD_VISIBLE })
export const nullActive = () => ({type: NULL_ACTIVE })
export const resetUI = () => ({ type: RESET_UI })
export const setActive = () => ({ type: SET_ACTIVE })
export const setVisible = () => ({ type: SET_VISIBLE })



export const toggleAuth = () => ({ type: TOGGLE_AUTH })
export const toggleInfo = () => ({ type: TOGGLE_INFO })
export const toggleList = () => ({ type: TOGGLE_LIST })
export const toggleSearch = () => ({ type: TOGGLE_SEARCH })
