import {
  ADD_CITY_DATA,
  ADD_FB_DATA,
  ANIMATE,
  NULL_ACTIVE,
  REQUESTS,
  RESET_UI,
  SET_ACTIVE,
  SET_CITY,
  SET_GRAPH,
  SHOW_MAIN
} from './constants/actionTypes.js'

const initial = {
  active: null,
  city: null,
  pids: [],
  places: {},
  ui: {
    main: false,
    info: {
      animated: false,
      open: false
    },
    list: {
      animated: false,
      open: false
    },
    search: {
      animated: false,
      open: false
    }
  }
}

export const reducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_CITY_DATA:
      return {
        ...state,
        city: action.city,
        pids: action.pids
      }
    case ADD_FB_DATA:
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
    case ANIMATE:
      return {
        ...state,
        ui: {
          ...state.ui,
          [action.target]: {
            animated: true,
            open: !state.ui[action.target].open
          }
        }
      }
    case NULL_ACTIVE:
      return state.showInfo ? { ...state, active: null } : state
    case REQUESTS:
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
    case RESET_UI:
      return { ...state, initial }
    case SET_ACTIVE:
      return {
        ...state,
        active: (state.active === action.value) ? null : action.value
      }
    case SHOW_MAIN:
      return {
        ...state,
        ui: {
          ...state.ui,
          main: !state.ui.main
        }
      }
    default:
      return state
  }
}
