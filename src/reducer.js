import {
  NULL_ACTIVE,
  REQUEST,
  RESET_UI,
  SET_ACTIVE,
  SET_CITY,
  SET_GRAPH,
  TOGGLE_AUTH,
  TOGGLE_INFO,
  TOGGLE_LIST,
  TOGGLE_SEARCH
} from './constants/actionTypes.js'

const defaultState = {
  active: null,
  city: null,
  pids: [],
  places: {},
  ui: {
    main: false,
    auth: {
      wasClicked: false,
      shouldOpen: false
    },
    info: {
      wasClicked: false,
      shouldOpen: false
    },
    list: {
      wasClicked: false,
      shouldOpen: false
    },
    list: {
      wasClicked: false,
      shouldOpen: false
    }
  }
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.name]: {
            error: action.status === 'error' || false,
            ok: action.status === 'ok' || false,
            open: action.status === 'open' || false
          }
        }
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
    case SET_GRAPH:
      const events = action.graph.events ? action.graph.events.data : []
      return {
        ...state,
        events: {
          ...state.events,
          [action.pid]: events.map(event => {
            return {
              description: event.description,
              key: event.id,
              name: event.name,
              offset: event.cover.offset_y,
              source: event.cover.source
            }
          })
        },
        places: {
          ...state.places,
          [action.pid]: {
            coverSrc: action.graph.cover.source,
            coverOffY: action.graph.cover.offset_y,
            latitude: action.graph.location.latitude,
            longitude: action.graph.location.longitude,
            name: action.graph.name
          }
        }
      }
    case TOGGLE_AUTH:
      return {
        ...state,
        ui: {
          ...state.ui,
          auth: {
            wasClicked: true,
            shouldOpen: !state.ui.auth.shouldOpen
          }
        }
      }
    case TOGGLE_INFO:
      return {
        ...state,
        ui: {
          ...state.ui,
          info: {
            wasClicked: true,
            shouldOpen: !state.ui.auth.shouldOpen
          }
        }
      }
    case TOGGLE_LIST:
      return {
        ...state,
        ui: {
          ...state.ui,
          list: {
            wasClicked: true,
            shouldOpen: !state.ui.auth.shouldOpen
          }
        }
      }
    case TOGGLE_SEARCH:
      return {
        ...state,
        ui: {
          ...state.ui,
          search: {
            wasClicked: true,
            shouldOpen: !state.ui.auth.shouldOpen
          }
        }
      }
    default:
      return state
  }
}
