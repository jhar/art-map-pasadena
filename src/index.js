import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Root from './containers/Root'
import { reducer } from './reducer.js'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementsByClassName('app')[0]
)

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

// function addVisible(places) {
//   mori.each(places, (place) => {
//     mori.assocIn(places, [place, "location", "visible"], false)
//   })
// }
//

//
// function search(places) {
//   return function(e) {
//     const pattern = new RegExp(e.target.value.toLowerCase())
//     let places = places
//     for (let i = 0; i < length; i++) {
//       let name = places[i].name
//       if (pattern.test(name.toLowerCase())) {
//         newPlaces[i].visible = true
//       } else {
//         newPlaces[i].visible = false
//       }
//     }
//     places = newPlaces
//   }
// }
//
// function getTop(e, oy, isEvent) {
//   const [fw, fh] = isEvent ? [826, 294] : [820, 312]
//   const nw = e.target.naturalWidth
//   const nh = e.target.naturalHeight
//   const ow = e.target.offsetWidth
//   return (oy * ow / 100) * ((nh / nw) - (fh / fw)) * -1
// }

// export function handleLogout(callback) {
//   FB.logout(() => callback())
// }
