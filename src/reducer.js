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

const defaultState = {
  activePlace: null,
  animateAuth: false,
  animateInfo: false,
  animateList: false,
  animateSearch: false,
  errorAuth: false,
  errorCities: false,
  errorGraph: false,
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
      return Object.assign({}, state, {
        errorAuth: true,
        requestingAuth: false,
        successAuth: false
      })
    case NULLIFY_ACTIVE:
      return (
        state.showInfo ?
          Object.assign({}, state, { activePlace: null }) :
          state
      )
    case REQUESTING_AUTH:
      return Object.assign({}, state, {
        errorAuth: false,
        requestingAuth: true,
        successAuth: false
      })
    case RESET_UI:
      return Object.assign({}, state, defaultState)
    case SELECT_ACTIVE:
      return Object.assign({}, state, {
        activePlace: (state.activePlace === action.value) ? null : action.value
      })
    case SET_PIDS:
      return Object.assign({}, state, {
        pids: action.value
      })
    case SUCCESS_AUTH:
      return Object.assign({}, state, {
        errorAuth: false,
        requestingAuth: false,
        successAuth: true
      })
    case TOGGLE_AUTH:
      return Object.assign({}, state, {
        animateAuth: true,
        showAuth: !state.showAuth
      })
    case TOGGLE_INFO:
      return Object.assign({}, state, {
        animateInfo: true,
        showInfo: !state.showInfo
      })
    case TOGGLE_LIST:
      return Object.assign({}, state, {
        animateList: true,
        listShow: !state.showList
      })
    case TOGGLE_SEARCH:
      return Object.assign({}, state, {
        animateSearch: true,
        showSearch: !state.showSearch
      })
    default:
      return state
  }
}
