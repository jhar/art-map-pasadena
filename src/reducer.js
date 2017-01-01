import {
  ERROR_AUTH,
  ERROR_CITIES,
  ERROR_GRAPH,
  NULL_ACTIVE,
  REQUESTING_AUTH,
  REQUESTING_CITIES,
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

const defaultState = {
  active: null,
  animateAuth: false,
  animateInfo: false,
  animateList: false,
  animateSearch: false,
  city: null,
  errorAuth: false,
  errorCities: false,
  errorGraph: false,
  pids: [],
  requestingAuth: false,
  requestingCities: false,
  requestingGraph: false,
  showAuth: false,
  showInfo: false,
  showList: false,
  showMain: false,
  showSearch: false,
  successAuth: false,
  successCities: false,
  successGraph: false
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ERROR_AUTH:
      return {
        ...state,
        errorAuth: true,
        requestingAuth: false,
        successAuth: false
      }
    case ERROR_CITY:
      return {
        ...state,
        errorCity: true,
        requestingCity: false,
        successCity: false
      }
    case NULL_ACTIVE:
      return state.showInfo ? { ...state, active: null } : state
    case REQUESTING_AUTH:
      return {
        ...state,
        errorAuth: false,
        requestingAuth: true,
        successAuth: false
      }
    case REQUESTING_CITY:
      return {
        ...state,
        errorCity: false,
        requestingCity: true,
        successCity: false
      }
    case RESET_UI:
      return { ...state, defaultState }
    case SET_ACTIVE:
      return {
        ...state,
        active: (state.active === action.value) ? null : action.value
      }
    case SET_CITY_AND_PIDS:
      return { ...state, city: action.city, pids: action.pids }
    case SUCCESS_AUTH:
      return {
        ...state,
        errorAuth: false,
        requestingAuth: false,
        successAuth: true
      }
    case SUCCESS_CITY:
      return {
        ...state,
        errorCity: false,
        requestingCity: false,
        successCity: true
      }
    case TOGGLE_AUTH:
      return {
        ...state,
        animateAuth: true,
        showAuth: !state.showAuth
      }
    case TOGGLE_INFO:
      return {
        ...state,
        animateInfo: true,
        showInfo: !state.showInfo
      }
    case TOGGLE_LIST:
      return {
        ...state,
        animateList: true,
        listShow: !state.showList
      }
    case TOGGLE_SEARCH:
      return {
        ...state,
        animateSearch: true,
        showSearch: !state.showSearch
      }
    default:
      return state
  }
}
