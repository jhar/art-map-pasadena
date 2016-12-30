const defaultState = {
  activePlace: null,
  authFailure: false,
  authSuccess: false,
  graphApiFailure: false,
  graphApiRequesting: false,
  graphApiSuccess: false,
  jsonFailure: false,
  jsonRequesting: false,
  jsonSuccess: false,
  infoClicked: false,
  infoShow: false,
  listClicked: false,
  listShow: false,
  loginClicked: false,
  loginShow: false,
  searchClicked: false,
  searchShow: false
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_VISIBILITY':
      return
    case 'LOAD_CITY_DATA':
      return
    case 'NULLIFY_ACTIVE':
      return (
        state.infoShow ?
          Object.assign({}, state, { activePlace: null }) :
          state
      )
    case 'RESET_UI':
      return Object.assign({}, state, {
        activePlace: null,
        fbIsAuthorized: false,
        infoClicked: false,
        infoShow: false,
        listClicked: false,
        listShow: false,
        loginClicked: false,
        loginShow: false,
        searchClicked: false,
        searchShow: false,
      })
    case 'SELECT_ACTIVE_PLACE':
      return Object.assign({}, state, {
        activePlace: (state.activePlace === action.value) ? null : action.value
      })
      return
    case 'SET_VISIBILITY':
      return
    case 'TOGGLE_INFO_VIEW':
      return Object.assign({}, state, {
        infoClicked: true,
        infoShow: !state.infoShow
      })
    case 'TOGGLE_LIST_VIEW':
      return Object.assign({}, state, {
        listClicked: true,
        listShow: !state.listShow
      })
    case 'TOGGLE_LOGIN_DIALOG':
      return Object.assign({}, state, {
        loginClicked: true,
        loginShow: !state.loginShow
      })
    case 'TOGGLE_SEARCH':
      return Object.assign({}, state, {
        searchClicked: true,
        searchShow: !state.searchShow
      })
    default:
      return state
  }
}

// TODO: goes after selectActive logic
// // Don't open a window that's already open
// if (ui.info.show === false || ui.active === null) {
//   if (ui.info.show) nullify(ui, ['active'])
//   infoToggle(ui)
// }
//
// // Close the list if it's open
// if (ui.list.show === true) listToggle(ui)


// TODO: Need nullify(active) to take place before TOGGLE_INFO_VIEW

function addVisible(places) {
  mori.each(places, (place) => {
    mori.assocIn(places, [place, "location", "visible"], false)
  })
}

function loadCity(city, places) {
  fetch('cities.json')
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })
}
