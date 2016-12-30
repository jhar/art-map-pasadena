import {
  ADD_VISIBILITY,
  LOAD_CITY_DATA,
  GRAPH_API_FAILURE,
  GRAPH_API_REQUEST,
  GRAPH_API_SUCCESS,
  JSON_FAILURE,
  JSON_REQUEST,
  JSON_SUCCESS,
  NULLIFY_ACTIVE,
  RESET_UI,
  SELECT_ACTIVE_PLACE,
  SET_VISIBILITY,
  TOGGLE_INFO_VIEW,
  TOGGLE_LIST_VIEW,
  TOGGLE_LOGIN_DIALOG,
  TOGGLE_SEARCH
} from './actionTypes.js'

// {
//   type: ADD_VISIBILITY
// }
//
// {
//   type: GRAPH_API_FAILURE
// }
// {
//   type: GRAPH_API_REQUEST
// }
// {
//   type: GRAPH_API_SUCCESS
// }
function graphApiFailure() {
  return {
    type: GRAPH_API_FAILURE
  }
}

function graphApiRequest(url) {
  return {
    type: GRAPH_API_REQUEST
    url: url
  }
}

function graphApiSuccess() {
  return {
    type: GRAPH_API_SUCCESS
  }
}

function jsonFailure() {
  return {
    type: JSON_FAILURE
  }
}

function jsonRequest(url) {
  return {
    type: JSON_REQUEST
    url: url
  }
}

function jsonSuccess() {
  return {
    type: JSON_SUCCESS
  }
}



//
// {
//   type: LOAD_CITY_DATA
// }
//
//
// {
//   type: NULLIFY_ACTIVE
// }
//
// {
//   type: RESET_UI
// }
//
// {
//   type: SELECT_ACTIVE_PLACE
// }
//
// {
//   type: SET_VISIBILITY
// }
//
// {
//   type: TOGGLE_INFO_VIEW
// }
//
// {
//   type: TOGGLE_LOGIN_DIALOG
// }
//
//
//
// {
//   type: TOGGLE_LIST_VIEW
// }
//
// {
//   type: TOGGLE_SEARCH
// }
