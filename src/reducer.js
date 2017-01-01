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

const defaultState = {
  active: null,
  city: {},
  pids: [],
  places: {},
  showMain: false,

  animateAuth: false,
  showAuth: false,

  animateInfo: false,
  showInfo: false,

  animateList: false,
  showList: false,

  animateSearch: false,
  showSearch: false,

  authErr: false,
  authOk: false,
  authReq: false,

  cityErr: false,
  cityOk: false,
  cityReq: false,

  graphErr: {},
  graphOk: {},
  graphReq: {}
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CITY_REQ:
      return { ...state, cityErr: false, cityOk: false, cityReq: true }
    case CITY_OK:
      return { ...state, cityErr: false, cityOk: true, cityReq: false }
    case CITY_ERR:
      return { ...state, cityErr: true, cityOk: false, cityReq: false }
    case AUTH_REQ:
      return { ...state, authErr: false, authOk: false, authReq: true }
    case AUTH_OK:
      return { ...state, authErr: false, authOk: true, authReq: false }
    case AUTH_ERR:
      return { ...state, authErr: true, authOk: false, authReq: false }
    case GRAPH_REQ:
      return {
        ...state,
        graphErr: { ...state.graphErr, [action.pid]: false },
        graphOk: { ...state.graphOk, [action.pid]: false },
        graphReq: { ...state.graphReq, [action.pid]: true }
      }
    case GRAPH_OK:
      return {
        ...state,
        graphErr: { ...state.graphErr, [action.pid]: false },
        graphOk: { ...state.graphOk, [action.pid]: true },
        graphReq: { ...state.graphReq, [action.pid]: false }
      }
    case GRAPH_ERR:
      return {
        ...state,
        graphErr: { ...state.graphErr, [action.pid]: true },
        graphOk: { ...state.graphOk, [action.pid]: false },
        graphReq: { ...state.graphReq, [action.pid]: false },
      }
    case NULL_ACTIVE:
      return state.showInfo ? { ...state, active: null } : state
    case RESET_UI:
      return { ...state, defaultState }
    case SET_ACTIVE:
      return {
        ...state,
        active: (state.active === action.value) ? null : action.value
      }
    case SET_CITY:
      return { ...state, city: action.city, pids: action.pids }
    case SET_PLACE:
      return {
        ...state,
        places: {
          ...state.places,
          [action.pid]: {
            coverSrc: action.coverSrc,
            coverOffY: action.coverOffY,
            latitude: action.latitude,
            longitude: action.longitude,
            name: action.name
          }
        }
      }
    case TOGGLE_AUTH:
      return { ...state, animateAuth: true, showAuth: !state.showAuth }
    case TOGGLE_INFO:
      return { ...state, animateInfo: true, showInfo: !state.showInfo }
    case TOGGLE_LIST:
      return { ...state, animateList: true, listShow: !state.showList }
    case TOGGLE_SEARCH:
      return { ...state, animateSearch: true, showSearch: !state.showSearch }
    default:
      return state
  }
}
