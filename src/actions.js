import {
  ADD_VISIBILITY,
  ERROR_AUTH,
  ERROR_CITIES,
  ERROR_GRAPH,
  NULLIFY_ACTIVE,
  REQUESTING_AUTH,
  REQUESTING_CITIES,
  REQUESTING_GRAPH,
  RESET_UI,
  SELECT_ACTIVE,
  SET_PIDS,
  SET_VISIBILITY,
  SUCCESS_AUTH,
  SUCCESS_CITIES,
  SUCCESS_GRAPH,
  TOGGLE_AUTH,
  TOGGLE_INFO,
  TOGGLE_LIST,
  TOGGLE_SEARCH
} from './actionTypes.js'

export const addVisible = () => ({ type: ADD_VISIBILITY })
export const errorAuth = () => ({ type: ERROR_AUTH })
export const errorCities = () => ({ type: ERROR_CITIES })
export const errorGraph = () => ({ type: ERROR_GRAPH })
export const nullifyActive = () => ({type: NULLIFY_ACTIVE })
export const requestingAuth = () => ({ type: REQUESTING_AUTH })
export const requestingCities = () => ({ type: REQUESTING_CITIES })
export const requestingGraph = () => ({ type: REQUESTING_GRAPH })
export const resetUI = () => ({ type: RESET_UI })
export const selectActive = () => ({ type: SELECT_ACTIVE })
export const setPids = (array) => ({
  type: SET_PIDS,
  value: array
})
export const setVisible = () => ({ type: SET_VISIBILITY })
export const successAuth = () => ({ type: SUCCESS_AUTH })
export const successCities = () => ({type: SUCCESS_CITIES })
export const successGraph = () => ({ type: SUCCESS_GRAPH })
export const toggleAuth = () => ({ type: TOGGLE_AUTH })
export const toggleInfo = () => ({ type: TOGGLE_INFO })
export const toggleList = () => ({ type: TOGGLE_LIST })
export const toggleSearch = () => ({ type: TOGGLE_SEARCH })
